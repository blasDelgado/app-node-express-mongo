import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import callRoutes from "./routes/calls-routes.js";
import authRoutes from "./routes/auth.routhes.js";
import path from "path";
import { engine } from 'express-handlebars';
import flash from "connect-flash";
import session from "express-session";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";


const app = express();

//Configuraciones
dotenv.config();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "pass",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(cookieParser());

//Routa de Vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Motor de vistas
console.log('directory-name', __dirname);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

//Variables globales
app.use((req, res, next) => {
    res.locals.mensaje = req.flash("mensaje");
    next();
});

//Rutas
app.use(callRoutes)
app.use(authRoutes)
export default app;