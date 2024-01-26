const warningService = require('../services/warning.service');
const message = require("../services/messageErrorConfirm.service")


const findAllWarnings = async (req, res) => {
    try {
        const warnings = await warningService.findAllServices();

        if (warnings.length === 0) {
            return res.status(404).send({ message: message.postNotFound });
        }

        res.send(warnings);
    } catch (error) {
        console.error('Erro ao buscar todos os warnings:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar os warnings" });
    }
};




const createWarning = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).send("O texto do aviso é obrigatório.");
        }

        const newWarning = await warningService.createWarningService({ text });

        return res.status(201).json({ text: newWarning.text });
    } catch (error) {
        console.error("Erro durante a postagem:", error);
        return res.status(500).send("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    }
};

module.exports = { findAllWarnings,createWarning };
