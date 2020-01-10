const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Token authentification failed.'});
                } else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}


module.exports.verifyJwtTokenStudent = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                statut = decoded.statut
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Token authentification failed.'});
                } else {
                    if(statut !== "student") {
                        res.redirect('/companyprofile')
                        console.log('coucou')
                    } else {
                        req._id = decoded._id;
                        next();
                    }
                }
            }
        )
    }
}

module.exports.verifyJwtTokenCompany = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                statut = decoded.statut
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Token authentification failed.'});
                } else {
                    if(statut !== "company") {
                        res.redirect('/studentprofile')
                    } else {
                        req._id = decoded._id;
                        next();
                    }
                }
            }
        )
    }
}