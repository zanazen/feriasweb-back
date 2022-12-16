import express from "express";
import FeriasModel from "../models/ferias.model.js";
import UserModel from "../models/user.model.js";
import verifyPossibility from "../middlewares/verifyPossibility.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const router = express.Router();

router.post(
  "/marcar/",
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const createNew = await FeriasModel.create({
        ...request.body,
        user: request.currentUser._id,
      });

      await UserModel.findByIdAndUpdate(request.currentUser._id, {
        $push: { ferias: createNew._id },
      });

      return response.status(201).json(createNew);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Algo está errado." });
    }
  }
);

router.get("/", async (request, response) => {
  try {
    const ferias = await FeriasModel.find().populate("user");

    return response.status(200).json(ferias);
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
      $pull: { ferias: deleteFerias._id },
    });

    return response.status(200).json(deleteFerias);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

export default router;
