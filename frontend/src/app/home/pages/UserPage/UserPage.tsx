import React, { useState } from 'react';

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
        // Lógica de cadastro de usuário
        alert('Usuário cadastrado com sucesso!');
    };

    return (
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
            <button type="submit" data-cy="cadastrar">Cadastrar</button>
        </form>
    );
};

export default UserPage;
