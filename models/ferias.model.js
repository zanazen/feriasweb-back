import { model, Schema } from "mongoose";

const feriasSchema = new Schema(
    {
        parcela1ini: { type: Date, required: true, default: 0 },
        parcela1fim: { type: Date, required: true, default: 0 },
        
        parcela2ini: { type: Date, required: false, default: 0 },
        parcela2fim: { type: Date, required: false, default: 0 },

        parcela3ini: { type: Date, required: false, default: 0 },
        parcela3fim: { type: Date, required: false, default: 0 },      
        
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    
{ timestamps: true, }
);

const FeriasModel = model("Ferias", feriasSchema);

export default FeriasModel;