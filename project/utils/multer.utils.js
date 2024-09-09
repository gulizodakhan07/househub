import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads')
    },
    filename: function (req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
})
const filterFile = (req,file,cb)=>{
    if(file.mimetype.startsWith('images')){
        cb(null,true)
    }else{
        cb(new Error('Only image file are allowed!'),false)
    }
}
export const upload = multer({
    storage: storage,
    fileFilter: filterFile
})