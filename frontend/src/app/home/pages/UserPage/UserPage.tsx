// src/app/home/pages/RegisterUserPage/RegisterUserPage.tsx
import React, { useState } from 'react';
import { User } from '../../../../shared/types/User';
import { addUser } from '../../../../shared/services/userService';
import '../../../../../src/app/home/pages/UserPage/styles.css';

interface UserWithPassword extends User {
    password: string;
}

const RegisterUserPage: React.FC = () => {
    const [user, setUser] = useState<UserWithPassword>({
        id: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        pedidos: [],
        password: '',
    });
    const [message, setMessage] = useState<string | null>(null);

    const handleRegisterUser = async (newUser: UserWithPassword) => {
        try {
            await addUser(newUser);
            setMessage('Usuário registrado com sucesso');
            setUser({
                id: '',
                nome: '',
                email: '',
                telefone: '',
                endereco: '',
                pedidos: [],
                password: '',
            });
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            setMessage('Erro ao registrar usuário');
        }
    };

    return (
        <div className="container">
            <h1>Registro de Usuário</h1>
            {message && <p className="message">{message}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleRegisterUser(user);
                }}
            >
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={user.nome}
                        onChange={(e) => setUser({ ...user, nome: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="text"
                        id="telefone"
                        value={user.telefone}
                        onChange={(e) => setUser({ ...user, telefone: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                        type="text"
                        id="endereco"
                        value={user.endereco}
                        onChange={(e) => setUser({ ...user, endereco: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterUserPage;
