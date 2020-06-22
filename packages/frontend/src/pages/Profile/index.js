import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlusCircle, FiEdit, FiX, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import logoImg from '../../assets/logo6.jpeg';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [subjects, setSubjects] = useState([]);
    const [day, setDay] = useState('');

    const history = useHistory();

    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    //o useEfect recebe dois parâmetros, o primeiro é que a função irá executar e o segundo é quando ela irá executar
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userEmail,
            }
        }).then(response => {
            setSubjects(response.data);
        });
    }, [userEmail]);

    async function handleDeleteSubject(id) {
        try {
            await api.delete(`subjects/${id}`, {
                headers: {
                    Authorization: userEmail,
                }
            });

            //depois usar a font FIRA CODE - FONT LIGATURES
            setSubjects(subjects.filter(subject => (subject.id !== id)));
        } catch (err) {
            alert('Erro ao deletar, tente novamente!');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    };

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="My Stdudy Routine" />
                <span>Bem vindo, {userName}</span>

                <Link className="button" onClick={handleLogout}>Sair</Link>
            </header>

            <h1>Rotina de estudo</h1>
            {/* <h2>Semana 1</h2> */}

            <div className="dia-semana">
                <div >
                    <table>
                        <h2>Segunda</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'segunda'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "segunda"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </table>
                </div>

                <div>
                    <table>
                        <h2>Terça</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'terça'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "terça"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>

                <div>
                    <table>
                        <h2>Quarta</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'quarta'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "quarta"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>

                <div>
                    <table>
                        <h2>Quinta</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'quinta'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "quinta"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>

                <div>
                    <table>
                        <h2>Sexta</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'sexta'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "sexta"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>

                <div>
                    <table>
                        <h2>Sábado</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'sábado'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "sábado"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>

                <div>
                    <table>
                        <h2>Domingo</h2>
                        <tr>
                            <th>Disciplina</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>
                                <Link to={`/subjects/new/${'domingo'}`}>
                                    <button type="button">
                                        <FiPlusCircle size={20} color="1E90FF" />
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        {subjects.filter(subject => (subject.day === "domingo"))
                            .map(subject => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.start}</td>
                                    <td>{subject.finish}</td>
                                    <td>
                                        {/* <button type="button">
                                            <FiThumbsUp size={20} color="006400" />
                                        </button>
                                        <button type="button">
                                            <FiThumbsDown size={20} color="e02041" />
                                        </button> */}
                                        <Link to={`subjects/update/${subject.id}/${subject.day}/${subject.name}/${subject.start}/${subject.finish}`}>
                                            <button type="button">
                                                <FiEdit size={20} color="1E90FF" />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteSubject(subject.id)} type="button">
                                            <FiX size={20} color="e02041" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>
            </div>
        </div>
    );
}