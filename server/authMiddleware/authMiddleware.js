const jwt= require('jsonwebtoken');
module.exports= async (req,res,next)=>{
   try {
    const token = req.headers["authorization"].split(" ")[1];
    await jwt.verify(token,process.env.JWT_SECRECT,(err,decoded)=>{
        if(err)
        {
            return res.status(401).send({
                message:"User unauthorized",
                sucess:false
            })
        }
        else{
            req.body.userId=decoded.id;
            next();
        }
    });
   } catch (error) {
    
   }
   
}