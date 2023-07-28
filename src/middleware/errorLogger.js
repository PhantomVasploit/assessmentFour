module.exports.errorLogger = (err, req, res, next)=>{
    if(err){
        console.log(err.message);
        return res.status(500).json({error: err.message})
    }
    next()
}