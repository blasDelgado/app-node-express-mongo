import partidosSchema from "../models/partidos.js";
import res from "express/lib/response.js";


const partidos = partidosSchema;

export const ultimopartido = async (req, res) => {
    try {
        const respuesta = await partidos.find().sort({ fecha: -1 }).findOne({}, { _id: 0 });
        res.render('partidos', { respuesta });
    } catch (e) { console.error(e); }
};

export const buscapartido = (req, res) => {
    try {

        let fechaReq = req.body;
        let fecha = parseInt(fechaReq.fecha);


        res.redirect('/partido/' + fecha);



    } catch (e) {

        console.error(e)
    }


};

export const partido = async (req, res) => {
    try {
        let fecha = req.params.fecha;

        let respuesta = await partidos.findOne({ fecha: fecha }, { _id: 0 });
        if (respuesta != undefined) {
            res.render('partidos', { respuesta });
        } else {
            respuesta = { mensaje: "No existe la fecha dada" }
            res.render('error', { respuesta });
        }
    } catch (e) { console.error(e.message); }

};

export const fecha = async (req, res) => {
    try {
        let fechas = req.body;


        let fecha1 = fechas.fecha1;
        let fecha2 = fechas.fecha2;

        res.redirect('/intervalodefechas' + fecha1 + "-" + fecha2);

    } catch (e) { console.error(e); }

};

export const intervalofecha = async (req, res) => {

    let fecha1 = parseInt(req.params.fecha1);
    let fecha2 = parseInt(req.params.fecha2);
    let respuesta;
    try {
        if (fecha1 < fecha2) {
            respuesta = await partidos.find({ fecha: { $gte: fecha1 } }).find({ fecha: { $lte: fecha2 } }).lean()
        } else {
            respuesta = await partidos.find({ fecha: { $gte: fecha2 } }).find({ fecha: { $lte: fecha1 } }).lean()
        }
    }
    catch (e) { console.error(e) };

    res.render('partidos', { respuesta });
};

export const puntosintervalo = (req, res) => {
    try {
        let fechas = req.body;
        let fecha1 = fechas.fecha1;
        let fecha2 = fechas.fecha2;
        res.redirect('/puntosintervalofecha' + fecha1 + fecha2);

    } catch (e) { console.error(e); }

};

export const puntos = async (req, res) => {

    let respuesta
    let fecha1 = req.params.fecha1
    let fecha2 = req.params.fecha2
    if (fecha1 < fecha2) {
        try { respuesta = await partidos.find({ fecha: { $gte: fecha1 } }, { puntos: 1, fecha: 1, _id: 0 }).find({ fecha: { $lte: fecha2 } }); }
        catch (e) { console.error(e) };

    } else {
        try { respuesta = await partidos.find({ fecha: { $gte: fecha2 } }, { puntos: 1, fecha: 1, _id: 0 }).find({ fecha: { $lte: fecha1 } }); }
        catch (e) { console.error(e) };
    }

    res.json(respuesta);

};

export const masgoleador = async (req, res) => {
    try {
        const respuesta = await partidos.find().sort({ goles_en_contra: -1 }).findOne({}, { _id: 0 });
        res.render('partidos', { respuesta });
    }
    catch (e) { console.error(e) };

};

export const todos = async (req, res) => {

    try {



        const respuesta = await partidos.find().lean();

        res.render('partidos', { respuesta });
    }
    catch (e) { console.error(e) };

};

export const agregar = async (req, res) => {

    try {
        const { fecha, rival, goles_a_favor, goles_en_contra, puntos } = req.body;


        if (fecha != Number & fecha == 0 & fecha > 30) {
            req.flash("mensaje", "Fecha inválida");
            res.redirect('/agregarpartido');
        }
        else if (rival == "" & rival != String) {
            req.flash("mensaje", "Rival inválido");
            res.redirect('/agregarpartido');
        }
        else if (isNaN(goles_a_favor)) {
            req.flash("mensaje", "Goles a favor inválido");
            res.redirect('/agregarpartido');
        }
        else if (isNaN(goles_en_contra)) {
            req.flash("mensaje", "Goles en contra no valido");
            res.redirect('/agregarpartido');
        }
        else if (isNaN(puntos) && puntos > 90) {
            req.flash("mensaje", "Puntos no valido");
            res.redirect('/agregarpartido');
        }
        else {
            const partido = new partidos({ "fecha": fecha, "rival": rival, "goles_a_favor": goles_a_favor, "goles_en_contra": goles_en_contra, "puntos": puntos });
            await partido.save();
            res.redirect('/todoslospartidos');
        }
    }


    catch (e) {

        console.error(e)
        req.flash("mensaje", "No se pudo ingresar el partido verifique los datos")
        res.redirect('/agregarpartido')


    };

};

export const formulario = (req, res) => {

    res.render('formulario')

};

export const masgoleado = async (req, res) => {

    try {
        const respuesta = await partidos.find().sort({ goles_a_favor: -1 }).findOne({}, { _id: 0 });
        res.render('partidos', { respuesta });
    }
    catch (e) { console.error(e) };



};

export const buscafecha = (req, res) => {

    res.render('buscadorfecha')

};

export const agregarpartido = (req, res) => {

    res.render('agregarpartido');

};

export const edicion = async (req, res) => {

    try {
        const respuesta = await partidos.find().lean();

        res.render('edicionpartidos', { respuesta });
    }
    catch (e) { console.error(e) };
}

export const eliminar = async (req, res) => {

    try {
        let fecha = parseInt(req.params.fecha);

        await partidos.collection.deleteOne({ fecha: fecha });

        res.redirect('/todoslospartidos');
    }

    catch (e) { console.error(e) }
}

export const editar = async (req, res) => {

    let _id = req.params._id;
    const respuesta = await partidos.find({ _id: _id }).lean();

    const resp = {
        _id: respuesta[0]._id,
        fecha: respuesta[0].fecha,
        rival: respuesta[0].rival,
        goles_a_favor: respuesta[0].goles_a_favor,
        goles_en_contra: respuesta[0].goles_en_contra,
        puntos: respuesta[0].puntos

    }

    res.render('editor', { resp });


}

export const editando = async (req, res) => {

    let _id = req.params._id;
    let { fecha, rival, goles_a_favor, goles_en_contra, puntos } = req.body;

    try {
        await partidos.findOneAndUpdate({ _id: _id }, { fecha: fecha, rival: rival, goles_a_favor: goles_a_favor, goles_en_contra: goles_en_contra, puntos: puntos })

        res.redirect('/todoslospartidos');
    }
    catch (e) {

        let respuesta = { mensaje: "Los datos ingresados no son válidos, no se pudo editar. No puede haber fechas repetidas." }
        res.render('error', { respuesta });
    }

};