const bcrypt = require("bcrypt");
const loginService = require("../services/auth.service");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await loginService(email);

        if (!user) {
            return res.status(404).send("Usuário não encontrado");
        }

        const passwordIsValid =  bcrypt.compareSync(password, user.password)

        if(!passwordIsValid){
            return res.status(400).send({message:"Senha ou usuário inválido"})
        }
            res.send("Login bem-sucedido");
        
    } catch (error) {
        console.error("Erro durante o login:", error);
        res.status(500).send("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    }
};

module.exports = { login };
