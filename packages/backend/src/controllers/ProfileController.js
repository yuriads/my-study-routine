const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_email = request.headers.authorization;

        // buscando todos os subjects que esse usuário criou
        const subjects = await connection('subjects')
            .where('user_email', user_email)
            .select('*');
        
        return response.json(subjects);
    }
};