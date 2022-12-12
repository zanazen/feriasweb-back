import express from 'express';
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'

const router = express.Router()
const rounds = 10

// cadastrar usuário
router.post("/registro", async (request, response) => {
    try {

    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "Erro no cadasto do usuário"})
    }
})

// login do usuário
router.post("/login", async (request, response) => {
    try {

    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "Erro no login do usuário"})
    }
})

// usuário logado - mostrar no frontend
router.get("/profile", isAuth, attachCurrentUser, async (request, response) => {
    try {

    } catch (error) {
        return response.status(500).json({msg: "Algo Errado"})
    }
})