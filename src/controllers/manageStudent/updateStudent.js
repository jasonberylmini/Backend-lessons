
import { Router } from "express";
import studentModel from "../../modules/studentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import{RESPONSE} from "../../config/global.js";
import { STATE } from "../../config/constant.js";
const router = Router();

export default router.put("/", async (req, res) => {
  try {
   
    let student_id=req.query.student_id;

    
    if(!student_id || student_id==undefined) {
      return send(res,setErrMsg(RESPONSE.MANDATORY,"student_id"));
    // //   return res.send({code: "201",message: "name is mandatory"});
     }
     const {name,email}=req.body;

     let updates={};


     if(name && name !=undefined){
        updates.name=name;
    }
    if(email && email !=undefined){
    let emailpattern=email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    if(!emailpattern){
      return send(res,setErrMsg(RESPONSE.INVALID,"email"));
   }
   let isEmailNoExist=await studentModel.findOne({
       email: email,
      });
   
      if (isEmailNoExist !=null){
       return send(res,setErrMsg(RESPONSE.ALRDY_EXIST,"email"));
      }
      updates.email=email;
    }

    //   console.log(updates);

// findOne method
//     let studentData=await studentModel.findOne(
//         {
//             _id: student_id,
//         isactive: STATE.ACTIVE,
//     },
    
// // {
// //     isactive:0,
// //     __v:0,
// );

// aggregate method
// let studentData=await studentModel.aggregate([
//   {
//     $match:{isactive:STATE.ACTIVE},
//   },

//   {
//     $project:{
//       isactive:0,
//       __v:0,
//     },
//   },
// ]);

    // if(studentData ==null){
    //     return send(res,setErrMsg(RESPONSE.NOT_FOUND,"student data"));  
    // }


    await studentModel.updateOne(
        {
            _id:student_id,
            isactive:STATE.ACTIVE,
        },
        { $set: updates}
    );


    // if(!email || email==undefined) {
    //   return send(res,setErrMsg(RESPONSE.MANDATORY,"email"));
    // }
    // if(!rollno || rollno==undefined) {
    //   return send(res,setErrMsg(RESPONSE.MANDATORY,"rollno"));
    // }

//     let emailpattern=email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

//     if(!emailpattern){
//       return send(res,setErrMsg(RESPONSE.INVALID,"email"));
//    }

//    let isRollNoExist=await studentModel.findOne({
//     rollno: rollno,
//    });

//    if (isRollNoExist !=null){
//     return send(res,setErrMsg(RESPONSE.ALRDY_EXIST,"rollno"));
//    }

//    let isEmailNoExist=await studentModel.findOne({
//     email: email,
//    });

//    if (isEmailNoExist !=null){
//     return send(res,setErrMsg(RESPONSE.ALRDY_EXIST,"email"));
//    }

    // console.log(req.body);

    
    // await studentModel.create({
    //   name:name,
    //   email:email,
    //   rollno:rollno,
    // });
    return send(res,RESPONSE.SUCESSS);
  } catch (error) {
    console.log("edit student ",error);
    return send(res,RESPONSE.UNKNOWN_ERR);
  }
});
