const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        console.log("here");
        const token = req.header("X-Auth-Token");
        
        if (!token){
            return res.status(401).json({msg:"No auth token"});
        }
        console.log(process.env.JWT_SECRET);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("here3");

        if (!verifiedToken){
            return res.status(401).json({msg:"Token not verified"});
        }
        req.user = verifiedToken.id;
        console.log("here2");
        next();
    } catch (error) {
        
    }
};

module.exports = auth;