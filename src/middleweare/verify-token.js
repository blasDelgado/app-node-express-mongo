import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/user.js";


export async function verifyToken(req, res, next) {


    let token = req.cookies.token;


    if (!token) {
        res.redirect('/signin');
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });

        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        console.error("jwt must be provided");

    }


}
