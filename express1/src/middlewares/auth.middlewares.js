const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send("Unauthorized - Token not provided");
        }

        const [schema, token] = authorization.split(" ");

        console.log("SCHEMA:", schema);
        console.log("TOKEN:", token);

        if (schema !== "Bearer") {
            return res.status(401).send("Unauthorized - Invalid schema");
        }

        jwt.verify(token, process.env.SECRETJWT, (error, decoded) => {
            if (error) {
                console.error('Erro na verificação do token:', error);
                return res.status(401).send({ message: "Token inválido" });
            }

            req.userId = decoded.id;
            next();
        });
    } catch (err) {
        console.error('Erro no middleware de autenticação:', err);
        res.status(500).send(err.message);
    }
};

module.exports = { authMiddleware };
