const fs  = require('fs-extra')
const imgController =  {};

imgController.save =  async(img)=>{
    const fechaHoy = new Date();
    var isSave =false;
    const nombreImg = fechaHoy.getFullYear()+ fechaHoy.getMonth()+ fechaHoy.getDayfechaHoy.getHours()+ fechaHoy.getMinutes()+fechaHoy.getSeconds();
    const imageTempPath = img.file.path;
    try{

        const ext =path.extname(img.file.originalname).toLowerCase();
        const targetPaht = path.resolve(`src/public/assets/prodcutos/${nombreImg}${ext}`);
        if(ext==='.png' || ext ==='.jpg' || ext ==='.jpeg' || ext =='.gif'){
            await fs.rename(imageTempPath, targetPaht);
        }
        isSave = true;
    }catch(err){
        console.log(err);
    }
    return isSave;
};

module.exports =  imgController;