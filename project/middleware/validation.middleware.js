const ValidationMiddleWare = (schema)=>{
    return (req,res,next) =>{
        const {error,value} = schema.validate(req.body)
        if(error){
            return res.status(400).send({
                message: "Validation error",
                error: error.message
            })
        }
        req.body = value
        next()
    }
}
export default ValidationMiddleWare