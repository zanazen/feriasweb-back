import express from "express";
import FeriasModel from "../models/ferias.model.js";
import UserModel from "../models/user.model.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const feriass = await FeriasModel.find()
      .populate("user")
      .sort({ deadline: 1 });

    return response.status(200).json(feriass);
  } catch (error) {
    console.log(error);

    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const getFeriasById = await FeriasModel.findById(id).populate("user");

    return response.status(200).json(getFeriasById);
  } catch (error) {
    console.log(error);

    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.post("/create/:employeeId", async (request, response) => {
  try {
    const { employeeId } = request.params;

    const createNew = await FeriasModel.create({
      ...request.body,
      user: employeeId,
    });

    await UserModel.findByIdAndUpdate(employeeId, {
      $push: { feriass: createNew._id },
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

    const update = await FeriasModel.findByIdAndUpdate(
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

    const deleteFerias = await FeriasModel.findByIdAndDelete(id);

    await UserModel.findByIdAndUpdate(deleteFerias.user, {
      $pull: { feriass: deleteFerias._id },
    });

    return response.status(200).json(deleteFerias);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

export default router;