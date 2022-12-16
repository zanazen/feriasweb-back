import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlenght: 100,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    password: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      minlength: 2,
      maxlenght: 50,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    departamento: {
      type: Schema.Types.ObjectId,
      ref: "Departamento",
    },
    inicioExercicio: {
      type: Date,
    },
    ferias: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ferias",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const UserModel = model("User", userSchema);

export default UserModel;
