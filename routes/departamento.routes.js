import express from "express";
import DepartamentoModel from "../models/departamento.model.js";
import UserModel from "../models/user.model.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const departamentos = await DepartamentoModel.find()
      .populate("user") // aqui vou popular? 
      .sort({ deadline: 1 });

    return response.status(200).json(departamentos);
  } catch (error) {
    console.log(error);

    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const getDepartamentoById = await DepartamentoModel.findById(id).populate("user");

    return response.status(200).json(getDepartamentoById);
  } catch (error) {
    console.log(error);

    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.post("/create/:employeeId", async (request, response) => {
  try {
    const { employeeId } = request.params;

    const createNew = await DepartamentoModel.create({
      ...request.body,
      user: employeeId,
    });

    await UserModel.findByIdAndUpdate(employeeId, {
      $push: { departamentos: createNew._id },
    });

    return response.status(201).json(createNew);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.put("/edit/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const update = await DepartamentoModel.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true, runValidators: true }
    );

    return response.status(200).json(update);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deleteDepartamento = await DepartamentoModel.findByIdAndDelete(id);

    await UserModel.findByIdAndUpdate(deleteDepartamento.user, {
      $pull: { departamentos: deleteDepartamento._id },
    });

    return response.status(200).json(deleteDepartamento);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

export default router;