const warningService = require('../services/warning.service');

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

module.exports = { createWarning };
