import React, { useState } from 'react';
import './styles.css';

const UserPage = () => {
    const [user, setUser] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        senha: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Usuário cadastrado com sucesso!');
    };

    return (
        <div className="user-container">
            <form onSubmit={handleSubmit} className="user-form">
                <h1 className="form-title">Cadastro de Usuário</h1>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        value={user.nome} 
                        onChange={handleInputChange}
                        data-cy="nome"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={user.email} 
                        onChange={handleInputChange}
                        data-cy="email"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input 
                        type="text" 
                        id="telefone" 
                        value={user.telefone} 
                        onChange={handleInputChange}
                        data-cy="telefone"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endereco">Endereço:</label>
                    <input 
                        type="text" 
                        id="endereco" 
                        value={user.endereco} 
                        onChange={handleInputChange}
                        data-cy="endereco"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input 
                        type="password" 
                        id="senha" 
                        value={user.senha} 
                        onChange={handleInputChange}
                        data-cy="senha"
                        className="form-input"
                    />
                </div>
                <button type="submit" data-cy="cadastrar" className="form-button">Cadastrar</button>
            </form>
        </div>
    );
};

export default UserPage;
