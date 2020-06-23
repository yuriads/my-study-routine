const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_email = request.headers.authorization;

        const [count] = await connection('students').count();

        const students = await connection('students')
        .where('user_email', user_email)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        response.json(students);
    },

    async create(request, response) {
        const { registration, name, shift, course, description } = request.body;
        const user_email = request.headers.authorization;

        try {
            const [id] = await connection('students').insert({
                registration,
                name,
                shift,
                course,
                description,
                user_email,
            });

            return response.json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Matrícula já cadastrada!' });
        }
    },

    async delete(request, response) {
        // pegando o id que vem por parâmetro
        const { id } = request.params;
        const user_email = request.headers.authorization;//usamos o user_email para saber se o student que estamos deletando realmente foi criado pelo o usuário

        const student = await connection('students')
            .where('id', id)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('user_email')//selecionando o user_email
            .first();//seleciona apenas um

        if (student.user_email != user_email) {//se o user_email desse student que buscamos no banco de dados for diferente do user_email que está logado da aplicação vai dá um erro
            return response.status(401).json({ error: 'Operação não permitida' });// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
        }

        await connection('students').where('id', id).delete();

        return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend
    },

    async update(request, response) {
        // pegando o id que vem por parâmetro
        const { id } = request.params;
        const { registration, name, shift, course, description } = request.body;
        const user_email = request.headers.authorization;//usamos o user_email para saber se o student que estamos deletando realmente foi criado pelo o usuário

        const student = await connection('students')
            .where('id', id)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('user_email')//selecionando o user_email
            .first();//seleciona apenas um

        if (student.user_email != user_email) {//se o user_email desse student que buscamos no banco de dados for diferente do user_email que está logado da aplicação vai dá um erro
            return response.status(401).json({ error: 'Operação não permitida' });// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
        }

        try{
        await connection('students')
            .where('id', id)
            .update({
                registration,
                name,
                shift,
                course,
                description,
            });

        return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend
        } catch (err) {
            return response.status(400).json({ error: 'Matrícula já cadastrado' });
        }
    }
}