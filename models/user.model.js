import { model, Schema } from "mongoose"

const userSchema = new Schema(
{
    nome: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlenght: 30
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
    },
    password: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 30
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    depart:
        {
          type: Schema.Types.ObjectId,
          ref: "Departamento",
        },
},
{
timestamps: true,
}
);
const UserModel = model("User", userSchema);

export default UserModel;
