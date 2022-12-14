import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import generateToken from "../config/jwt.config.js";
import FeriasModel from "../models/ferias.model.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
// import DepartamentoModel from "../models/departamento.model.js";

const router = express.Router();
const rounds = 10;

router.post("/register", async (request, response) => {
  try {
    const { password } = request.body;

    if (!password) {
      return response.status(400).json({ msg: "senha não foi inserida" });
    }

    const saltString = await bcrypt.genSalt(rounds);
    const hashPassword = await bcrypt.hash(password, saltString);

    const user = await UserModel.create({
      ...request.body,
      password: hashPassword,
    });

    delete user._doc.password;

    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado com o cadastro" });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response
        .status(400)
        .json({ msg: "senha e e-mail não está cadastrado" });
    }

    if (await bcrypt.compare(password, user.password)) {
      delete user._doc.password;
      const token = generateToken(user);

      return response.status(200).json({
        user: user,
        token: token,
      });
    } else {
      return response
        .status(401)
        .json({ msg: "senha e e-mail não está correta" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado no login" });
  }
});

router.get("/all", isAuth, attachCurrentUser, async (request, response) => {
  try {
    const user = await UserModel.findById(request.currentUser._id).populate(
      "ferias"
    ); //ferias campo do schema
    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo deu errado." });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const employee = await UserModel.findById(id);

    if (!employee) {
      return response.status(404).json("Colaborador não encontrado");
    }

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo deu errado." });
  }
});

router.put("/edit", isAuth, attachCurrentUser, async (request, response) => {
  try {
    const updateEmployeeById = await UserModel.findByIdAndUpdate(
      request.currentUser._id,
      { ...request.body },
      { new: true, runValidators: true }
    );

    return response.status(200).json(updateEmployeeById);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado" });
  }
});

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    await UserModel.findByIdAndDelete(id);
    await FeriasModel.deleteMany({ responsable: id });

    return response
      .status(200)
      .json({ msg: "colaborador deletado com sucesso" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado" });
  }
});

export default router;
