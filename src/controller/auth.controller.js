import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";
import eflash from "connect-flash";
import { clearCookie } from "express/lib/response";

export const signup = async (req, res) => {
    try {





        let { username, password } = req.body;

        const usuarioExiste = await User.findOne({ username: req.body.username });

        if (usuarioExiste) {
            req.flash("mensaje", "El Usuario ya existe");
            res.redirect('/signup');

        }

        let user = new User({
            username,
            password

        })
        user.password = await user.encryptPassword(password);

        await user.save();

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 60 * 60 * 24,
        });
        res.cookie('token', token);
        res.redirect('/todoslospartidos');
    }

    catch (error) {
        console.log(error);

    }
};

export const signin = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            req.flash("mensaje", "El Usuario no existe");
            res.redirect('/signin');

        }
        else {

            const validPassword = await user.comparePassword(
                req.body.password,
                user.password
            );

            if (!validPassword) {

                req.flash("mensaje", "La Contraseña es errónea");
                res.redirect('/signin');
            }


            else {

                const token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 60 * 60 * 24,
                })

                res.cookie('token', token);

                res.redirect("/todoslospartidos");


            };
        }
    } catch (e) { console.error(e) };
}

export const signinV = (req, res) => {

    res.render('login');
};

export const signout = (req, res) => {

    res.clearCookie('token');
    res.redirect('/signin');


}

export const signupV = (req, res) => {

    res.render('signup');

};

