const wrongInCode = (err, req, res, next)=>{
    const errStatus = err.status || 500;
    const errMsg = err.message;
    
    res.status(errStatus).send({
        message: errMsg
    });
}

module.exports = {wrongInCode}