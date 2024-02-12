const express = require ("express")
const Routes = express.Router()
const story = require("../controllers/story")


Routes.get("/getAll",story.getAll)
Routes.get("/getone/:title",story.getonestory)
Routes.post("/post",story.add)
Routes.delete("/del/:id",story.del)
Routes.put("/put/:id",story.update)
Routes.get("/getcategory/:id",story.getcategory)
Routes.get("/getuserstory/:id",story.getstorybyuser)


module.exports= Routes