import { model, Schema } from "mongoose";

const departamentoSchema = new Schema(
  {    
    nomedepartamento: { type: String, maxlength: 100, required: true, trim: true, unique: true },
    sigla: { type: String, maxlength: 10, required: true, trim: true, unique: true },
    localizacao: {
        cidade: { type: String },
        estado: { type: String },
      },
      user: [
        { type: Schema.Types.ObjectId, ref: "User" },
      ]    //varios usuarios //array
  },
  {
    timestamps: true,
  }
);

const DepartamentoModel = model("Departamento", departamentoSchema);

export default DepartamentoModel;
