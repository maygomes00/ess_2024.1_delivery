// src/app/home/pages/UsersConfigPage/EditUserPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../../../shared/types/User';
import { fetchUserById, updateUser } from '../../../../shared/services/userService';
import '../../../../../src/app/home/pages/UserPage/styles.css';

const EditUserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const fetchedUser = await fetchUserById(userId!);
                setUser(fetchedUser);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                setMessage('Erro ao buscar usuário');
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [userId]);

    const handleUpdateUser = async (updatedUser: User) => {
        try {
            await updateUser(updatedUser);
            setMessage('Usuário atualizado com sucesso');
            navigate('/users/config');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            setMessage('Erro ao atualizar usuário');
        }
    };

    if (loading) {
        return <p>Carregando usuário...</p>;
    }

    if (!user) {
        return <p>Usuário não encontrado</p>;
    }

    return (
        <div className="container">
            <h1>Editar Usuário</h1>
            {message && <p className="message">{message}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateUser(user);
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
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditUserPage;
