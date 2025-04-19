import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import teacherModel from "../../models/teacherModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();


export default router.post("/", async (req, res) => {
  try {
    
      const { name, email, password } = req.body;

      if (!name || name == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "name"));
        // return res.send({ code: "201", message: "name is mandatory" });
      }
      if (!email || email == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "email"));
      }
      if (!password || password == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "password"));
      }

      let emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

      if (!emailPattern) {
        return send(res, setErrMsg(RESPONSE.INVALID, "email"));
      }

      
      let passwordPattern = password.match(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/);

      if (!passwordPattern) {
        return send(res, setErrMsg(RESPONSE.INVALID, "password"));
      }

      // let isRollNoExist = await studentModel.findOne({
      //   rollno: rollno,
      // });

      // if (isRollNoExist != null) {
      //   return send(res, setErrMsg(RESPONSE.ALRDY_EXST, "rollno"));
      // }

      let isEmailExist = await teacherModel.findOne({
        email: email,
      });

      if (isEmailExist != null) {
        return send(res, setErrMsg(RESPONSE.ALRDY_EXST, "email"));
      }

      await teacherModel.create({
        name: name,
        email: email,
        password: password,
      });

      return send(res, RESPONSE.SUCESSS);
  } catch (error) {
    console.log("create student:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});

