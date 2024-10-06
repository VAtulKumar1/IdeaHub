import User from "../models/userSchema";
import generateToken from "../jwt/generateToken";
import bcrypt from "bcrypt";
import generateRefereshToken from "../jwt/generateRefereshToken";
import { Request, Response } from "express";
import Token from "../models/refreshTokenSchema";

interface RegisterReqBody {
    userName: string;
    email: string;
    password: string;
}

interface User {
    userName: string;
    email: string;
    password: string;
    role: string;
    _id: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export const register = async (req: Request, res: Response) => {
    const { userName, email, password }: RegisterReqBody = req.body;

    try {
        const salt = await bcrypt.genSalt(8);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        const newUser = new User({
            userName,
            email,
            password: encryptedPassword,
        });
        newUser.save();

        const response = {
            _id: newUser._id,
            userName: newUser.userName,
        };
        res.status(200).json(response);
    } catch (error) {
        console.log({ message: "some error occured" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password }: LoginRequestBody = req.body;

    if (!(email && password)) {
        res.status(401).json({
            message: "please provide both values",
        });
    }

    try {
        const user = await User.findOne({ email }, "+password");

        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        if (
            user != null &&
            !bcrypt.compare(password, user.password as string)
        ) {
            res.status(401).json({ message: "invalid credentials" });
        } else if (user != null) {
            const accessToken = generateToken(user.userName, email, "User");
            const refreshToken = generateRefereshToken(
                user.userName,
                email,
                "User"
            );
            res.cookie("token", accessToken, { httpOnly: true });
            res.cookie("refreshToken", refreshToken, { httpOnly: true });
            res.status(200).json({
                userName: user.userName,
                _id: user._id,
                accessToken,
                refreshToken,
            });
            return;
        }
    } catch (error) {
        res.status(500).json("some erro occured");
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const header: string | undefined = req.get("Refresh-Token");
    const refreshToken: string | undefined = header && header.split(" ")[1];

    if (typeof header === undefined || typeof refreshToken === undefined) {
        res.status(401).json({
            message: "Invalid Request",
        });
    }

    const userId: string = req.params["id"];

    if (!(userId && refreshToken)) {
        res.status(401).send("Please provide a valid refresh token");
    }

    const tokenExists = await Token.findOne({ userId }, "+token");

    if (tokenExists !== null) {
        const user = await User.findOne({ _id: userId }, "-password");
        if (user) {
            const accessToken = generateToken(
                user?.userName as string,
                user?.email as string,
                "User"
            );
            const response = {
                user,
                accessToken,
            };
            res.status(200).json(response);
        }
    } else {
        res.status(401).send("Please login refresh Token expired");
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    const userId: string = req.params["id"];
    const { currentPassword, newPassword }: UpdatePasswordRequest = req.body;
    if (!userId) {
        res.status(401).send("Please provide a valid userId");
        return;
    }

    if (!(currentPassword && newPassword)) {
        res.status(401).send("both fields are mandatory");
    }

    const userExists = await User.findOne({ _id: userId }, "+password");

    if (
        userExists &&
        (await bcrypt.compare(currentPassword, userExists?.password))
    ) {
        userExists.password = currentPassword;
        res.status(200).send("password updated successfully");
        return;
    } else {
        res.status(401).send("please provide a valid password");
    }
};
