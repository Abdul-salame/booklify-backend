import bcrypt from "bcryptjs";
import userModel from "../../model/user.js";

// register new user
export async function CreateUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const normalizedEmail = email ? email.toLowerCase().trim() : email;

    if (!firstName || !lastName || !normalizedEmail || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await userModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashPassword
        });

        res.status(201).json({
            message: `${newUser.firstName} ${newUser.lastName} has been created successfully`,
            user: { id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

// loing authenticate user
export async function LoginUser(req, res) {
    const { email, password } = req.body;
    const normalizedEmail = email ? email.toLowerCase().trim() : email;

    if (!normalizedEmail || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}
