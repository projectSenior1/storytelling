const express = require ("express")
const Routes = express.Router()
const controller = require("../controllers/users")

Routes.get("/getAllusers",controller.getAllusers)
Routes.post("/add",controller.add)
Routes.post("/Register",controller.register)
Routes.post("/login",controller.login)
Routes.get("/getoneuser/:id",controller.getoneuser)



module.exports= Routes