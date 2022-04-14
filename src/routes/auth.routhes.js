import { Router } from "express";
import { signup, signin, signinV, signout, signupV } from "../controller/auth.controller.js";
import { haveToken } from "../middleweare/have-token.js";
const router = Router();
const token = haveToken;

//vistas
router.get("/signup", token, signupV)
router.get("/signin", token, signinV)
//post
router.post("/signup", token, signup);
router.post("/signin", token, signin);
//Cerrar sesion
router.get("/signout", signout)

export default router;