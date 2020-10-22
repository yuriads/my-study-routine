const connection = require('../database/connection');

module.exports = {

    

    async index(request, response) {
        // const {id_student} = request.body;

        const id_student = request.headers.authorization_student;

        const [count] = await connection('subjects')
        .join('students', 'subjects.id_student','=','students.id')
        .where({
            id_student: id_student
        })
        .count();

        // buscando todos os subjects que esse usuário criou
        const subjects = await connection('subjects')
            .join('students', 'subjects.id_student','=','students.id')
            .where({
                id_student: id_student
            })
            .select('subjects.id', 'subjects.day','subjects.name', 'subjects.start', 'subjects.finish')
            .orderBy('start');
        
        response.header('X-Total-Count-Subject', count['count(*)']);
        

        return response.json(subjects);
    },

    async update (request, response) {

        //const { id } = request.params;

        const id_student = request.headers.authorization_student;

        const [count] = await connection('subjects')
        .join('students', 'subjects.id_student','=','students.id')
        .where({
            id_student: id_student
        })
        .count();

        const performance = toString(1/count);

        

        const student = await connection('students')
            .where('id', id_student)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('id')//selecionando o user_email
            .first();//seleciona apenas um

        if (student.id != id_student) {//se o user_email desse student que buscamos no banco de dados for diferente do user_email que está logado da aplicação vai dá um erro
            return response.status(401).json({ error: 'Operação não permitida' });// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
        }

        await connection('students')
                .where('id', id_student)
                .update({
                    performance,
                });

            return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend


    }

    
};