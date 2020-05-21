import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import props from 'prop-types';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo6.jpeg';

export default function NewSubject() {
    const [day, setDay] = useState('');
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [finish, setFinish] = useState('');
    const [success, setSuccess] = useState('');

    const list = [
        { dia: 'Selecione um dia' },
        { dia: 'segunda' },
        { dia: 'terça' },
        { dia: 'quarta' },
        { dia: 'quinta' },
        { dia: 'sexta' },
        { dia: 'sábado' },
        { dia: 'domingo' },
    ];

    const history = useHistory();

    const userEmail = localStorage.getItem('userEmail');

    async function handleUpdateSubject(e) {
        e.preventDefault();
        
        const id = props.match.params;

        const data = {
            id,
            day,
            name,
            start,
            finish,
        };

        try {
            if (day === "") {
                alert('Por favor, selecione um dia da semana');
            } else {
                await api.put(`subjects/${id}`, data, {
                // await api.put(`subjects`, data, {
                    headers: {
                        Authorization: userEmail,
                    }
                });

                history.push('/profile');
            }
        } catch (err) {
            alert('Erro ao atualizar disciplina!')
        }
    }

    return (
        <div className="new-subject-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="My Study Routine" />

                    <h1>Atualizar um horário</h1>
                    <p>Coloque o nome e os horários da disciplina</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#1E90FF" />
                        Voltar a página inical
                    </Link>
                </section>

                <form onSubmit={handleUpdateSubject}>
                    <select value={day} onChange={e => setDay(e.target.value)}>
                        {list.map((item, index) => (
                            <option value={item.dia}>{item.dia}</option>
                        ))}
                    </select>
                    <input
                        placeholder="Nome da disciplina"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="Horário de início"
                        value={start}
                        onChange={e => setStart(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="Horário de término"
                        value={finish}
                        onChange={e => setFinish(e.target.value)}
                    />

                    <button className="button" type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    );
}