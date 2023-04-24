const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).send({ error: 'No token provided' });
    } else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if (err){
                res.status(403).send({ error: 'Token invalid' });
            } else {
                next();
            }
    })}}