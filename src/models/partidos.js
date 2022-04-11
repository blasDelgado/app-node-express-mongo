import { Schema, model } from "mongoose";

const partidosSchema = new Schema({
    fecha: {
        type: Number,
        required: true,
        unique: true
    },
    rival: {
        type: String,
        required: true,

    },
    goles_a_favor: {
        type: Number,
        required: true,
    },
    goles_en_contra: {
        type: Number,
        required: true,
    },
    puntos: {
        type: Number,
        required: true,
    },
});

export default model('primera2021', partidosSchema);