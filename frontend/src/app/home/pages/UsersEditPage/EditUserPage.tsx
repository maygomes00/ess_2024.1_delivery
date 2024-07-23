import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditUserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Lógica para buscar os dados do usuário com userId
        // Simulação de busca
        const fetchedUser = {
            nome: 'Nome Exemplo',
            email: 'email@example.com',
            telefone: '123456789',
            endereco: 'Rua Exemplo, 123'
        };
        setUser(fetchedUser);
    }, [userId]);

    const handleUpdateUser = (updatedUser) => {
        // Lógica para atualizar os dados do usuário
        setMessage('Usuário atualizado com sucesso!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateUser(user);
    };

    return (
        <div className="edit-user-page" data-cy="edit-user-page">
            <h1>Editar Usuário</h1>
            {message && <p className="message" data-cy="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        value={user.nome} 
                        onChange={(e) => setUser({ ...user, nome: e.target.value })}
                        data-cy="nome"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={user.email} 
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        data-cy="email"
                    />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input 
                        type="text" 
                        id="telefone" 
                        value={user.telefone} 
                        onChange={(e) => setUser({ ...user, telefone: e.target.value })}
                        data-cy="telefone"
                    />
                </div>
                <div>
                    <label htmlFor="endereco">Endereço:</label>
                    <input 
                        type="text" 
                        id="endereco" 
                        value={user.endereco} 
                        onChange={(e) => setUser({ ...user, endereco: e.target.value })}
                        data-cy="endereco"
                    />
                </div>
                <button type="submit" data-cy="salvar">Salvar</button>
            </form>
        </div>
    );
};

export default EditUserPage;
