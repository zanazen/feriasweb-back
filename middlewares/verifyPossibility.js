import UserModel from "../models/user.model.js";

async function verifyPossibility(request, response, next) {
  try {

    const loggedUser = request.params;
    //console.log(loggedUser)

    const userCurrent = await UserModel.findById(loggedUser.userId)
    //console.log(userCurrent)

    const inicioExercicio = userCurrent.inicioExercicio
    const dataAtual = Date.now()

    let difference = dataAtual - inicioExercicio;

    const days = Math.ceil(difference / (1000 * 3600 * 24));

    if (days >= 365) {
        next()
    } else {
        return response.status(406).json("Usuário impossibilitado de marcar férias");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("algo deu errado", error);
  }
}

export default verifyPossibility;