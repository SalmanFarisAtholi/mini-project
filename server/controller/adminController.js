const adminModel =require('../model/adminSchema')
const bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const usermodel = require('../model/userschema')

module.exports.admin_login = async (req, res) => {
    try {
        const {email,password}=req.body
        const admin =await adminModel.findOne({email: email})
        if(admin){
            const isMatch = await bcrypt.compare(password,admin.password)
            if(admin.email === email && isMatch){
                const token = jwt.sign({ adminID: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                const admindetails ={
                    email: admin.email,
                }
                res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })

            }else{
                res.json({"auth":false, "status": "failed", "message": "User password is incorrect" })

            }
        }else{
            res.json({"adminauth":false, "status": "failed", "message": "No Admin found" })

        }
        
    } catch (error) {
        console.log(error)
    }
   
}

module.exports.isAdminAuth = async (req, res) => {
    try {
       
    let admin = await adminModel.findById(req.adminId)
    
 console.log(req.adminId)
    const admindetails ={
        email: admin.email,
    }
    res.json({"auth":true,"result":admindetails, "status": "success", "message": "signin success" })
    } catch (error) {
        console.log(error)
    }
    

}

module.exports.getUsers = async (req,res)=>{
    try {
        const users = await usermodel.find({})
      
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
        
    }
}

module.exports.deleteUsers= async (req,res)=>{
    try {
        const id= req.body.id
        await usermodel.findByIdAndDelete(id)
        const users = await usermodel.find({})
      
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
    }
}

module.exports.block_user= async (req,res)=>{
    try {
        await usermodel.findByIdAndUpdate(id,{isBanned:true})
        const users = await usermodel.find({})
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
    }
}
