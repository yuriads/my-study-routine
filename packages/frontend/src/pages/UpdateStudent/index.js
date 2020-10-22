import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function UpdateSubject(props) {
    const [registration, setRegistration] = useState('');
    const [name, setName] = useState('');
    const [shift, setShift] = useState('');
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');
    const [students, setStudents] = useState([]);

    const list_shift = [
        { shift: 'Selecione um turno' },
        { shift: 'Manhã' },
        { shift: 'Tarde' },
        { shift: 'Noite' },
    ];

    const list_course = [
        { course: 'Selecione um curso' },
        { course: 'Médio integrado com Informática' },
        { course: 'Médio integrado com Meio Ambiente' },
        { course: 'Subsequente de Informática' },
    ];

    const history = useHistory();

    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        api.get('students', {
            headers: {
                Authorization: userEmail,
            }
        }).then(response => {
            setStudents(response.data);

            // subjects.filter(subject => (subject.id == props.match.params.id))
            //     .map(subject => (
            //         setDay(subject.day),
            //         setName(subject.name),
            //         setStart(subject.start),
            //         setFinish(subject.finish)
            // ))
            
            setRegistration(props.match.params.registration);
            setName(props.match.params.name);
            setShift(props.match.params.shift);
            setCourse(props.match.params.course);
            setDescription(props.match.params.description);

        });
    }, [userEmail]);


    async function handleUpdateStudent(e) {
        e.preventDefault();

        const id = props.match.params.id;

        const data = {
            id,
            registration,
            name,
            shift,
            course,
            description,
        };

        try {
            await api.put(`students/${id}`, data, {
                headers: {
                    Authorization: userEmail,
                }
            });

            history.push('/students');

        } catch (err) {
            alert('Matrícula já cadastrada!')
        }
    }

    return (
        <div className="new-student-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="My Study Routine" />

                    <h1>Atualizar Alunos</h1>
                    <p>Coloque os dados do aluno</p>

                    <Link className="back-link" to="/students">
                        <FiArrowLeft size={16} color="#1E90FF" />
                        Voltar a lista de alunos
                    </Link>
                </section>

                <form onSubmit={handleUpdateStudent}>
                    <input
                        placeholder="Matrícula"
                        value={registration}
                        onChange={e => setRegistration(e.target.value)}
                    />
                    <input
                        placeholder="Nome do aluno"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <select value={shift} onChange={e => setShift(e.target.value)}>
                        {list_shift.map((item, index) => (
                            <option value={item.shift}>{item.shift}</option>
                        ))}
                    </select>
                    <select value={course} onChange={e => setCourse(e.target.value)}>
                        {list_course.map((item, index) => (
                            <option value={item.course}>{item.course}</option>
                        ))}
                    </select>
                    <textarea rows='100'
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button className="button" type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    );
}