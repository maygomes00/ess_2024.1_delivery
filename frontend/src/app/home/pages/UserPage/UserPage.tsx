import React, { useState } from 'react';
import './styles.css'; // Importando o arquivo de estilo

const UserPage = () => {
    const [user, setUser] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        senha: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Usuário cadastrado com sucesso!');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h1 className="h1">Cadastro de Usuário</h1>
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
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input 
                        type="password" 
                        id="senha" 
                        value={user.senha} 
                        onChange={(e) => setUser({ ...user, senha: e.target.value })}
                        data-cy="senha"
                    />
                </div>
                <button type="submit" data-cy="cadastrar" className="button">Cadastrar</button>
            </form>
        </div>
    );
};

export default UserPage;
