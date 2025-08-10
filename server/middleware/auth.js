const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {

    // const token = req.headers['authorization'];
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized user' })
    }

    

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: err.message })
        }
        req.user = decoded;
        // console.log(decoded)
        next();
    })

}