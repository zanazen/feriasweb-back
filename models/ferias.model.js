import { model, Schema } from "mongoose";

const feriasSchema = new Schema(
    {

        // O servidor poderá marcar vários períodos de férias 
        // conforme previsto pela regulamentação do órgão
        // cada marcação de período de férias podera estar com status agendado,
        // gozando ou até cancelado

        inicioPeriodo: {
            type: Date,
            default: Date.now(),
        },
        fimPeriodo: {
            type: Date,
            default: Date.now(),
        },
        status: {
            type: String,
            default: "agendado"
        },        
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    
{ timestamps: true }
);

const FeriasModel = model("Ferias", feriasSchema);

export default FeriasModel;