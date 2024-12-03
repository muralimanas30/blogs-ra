
const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer'))
        throw new Error('!authHeader || !authHeader.startsWith("Bearer")')
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:payload.userId,name : payload.name}
        next()
    }
    catch(e){
        throw new Error(e.message)
    }
}
module.exports = auth