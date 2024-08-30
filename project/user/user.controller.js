import { User } from "./user.models.js"

class UserController {
    #_model
    constructor(){
        this.#_model = User
    }
    getAllUsers = async(req,res,next)=>{
        try{
            

        }catch(err){
            next(err)

        }


    }
    createUser = async(req,res)=>{
        try{

        }catch(err){
            next(err)

        }

    }
    updateUser = async(req,res)=>{
        try{

        }catch(err){
            next(err)

        }

    }
    deleteUser = async(req,res)=>{
        try{

        }catch(err){
            next(err)

        }

    }
}
export default new UserController()