
import {
    todos,
    masgoleador,
    puntos,
    intervalofecha,
    fecha,
    partido,
    ultimopartido,
    buscapartido,
    puntosintervalo,
    agregar,
    agregarpartido,
    formulario,
    masgoleado,
    buscafecha,
    edicion,
    eliminar,
    editar,
    editando
} from "../controller/calls-controller.js";
import { Router } from "express";
const router = Router();
import { verifyToken } from "../middleweare/verify-token.js";
const token = verifyToken;

router.get("/", todos);
//Pagina principal.
router.get("/todoslospartidos", token, todos);

//Cosultas rapidas.
router.get("/ultimopartido", token, ultimopartido);
router.get("/equipomasgoleshizo", token, masgoleador);
router.get("/equipomasgoleshicimos", token, masgoleado);

//Cosultas especificas que requieren post.
router.post("/buscarpartido", token, buscapartido);
router.get("/partido/:fecha", token, partido);

router.post("/fecha", token, fecha);
router.get("/intervalodefechas:fecha1-:fecha2", token, intervalofecha);

router.post("/puntosintervalofecha", token, puntosintervalo)
router.get("/puntosintervalofecha:fecha1:fecha2", token, puntos);

//Agregar, editar y eliminar.
router.get("/agregarpartido", token, agregarpartido)
router.post("/agregarpartido", token, agregar);
router.get("/editar/:_id", token, editar)
router.post("/editar/:_id", token, editando)
router.get("/eliminar/:fecha", token, eliminar)

//Vistas.
router.get("/formulariodebusqueda", token, formulario)
router.get("/buscadordefecha", token, buscafecha)
router.get("/editarpartidos", token, edicion);


export default router;