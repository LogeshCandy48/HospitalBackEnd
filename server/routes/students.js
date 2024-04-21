const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsController");

//view all records
router.get("/",studentController.view);

// Add records
router.get("/adduser",studentController.adduser);

router.post("/adduser",studentController.save);

// Edit records
router.get("/edituser/:id",studentController.edituser);

router.post("/edituser/:id",studentController.edit);



module.exports=router;

