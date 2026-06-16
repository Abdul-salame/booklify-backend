import { validationResult } from "express-validator";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeValue = (value, isPassword = false) => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, isPassword));
  }

  if (value && typeof value === "object") {
    const sanitizedObject = {};
    Object.entries(value).forEach(([key, childValue]) => {
      sanitizedObject[key] = sanitizeValue(childValue, key === "password");
    });
    return sanitizedObject;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (isPassword) {
      return trimmedValue;
    }
    return escapeHtml(trimmedValue.replace(/\s+/g, " "));
  }

  return value;
};

export function sanitizeRequest(req, _res, next) {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }

  if (req.params && typeof req.params === "object") {
    Object.entries(req.params).forEach(([key, value]) => {
      req.params[key] = sanitizeValue(value);
    });
  }

  next();
}

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((error) => ({ field: error.path, message: error.msg }))
    });
  }
  next();
}
