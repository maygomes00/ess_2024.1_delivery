// src/app/home/pages/UsersConfigPage/UsersConfigPage.tsx
import React, { useState, useEffect } from 'react';
import UserList from '../../../../shared/components/ListUser/UserList';
import { User } from '../../../../shared/types/User';
import { fetchUsers, deleteUser } from '../../../../shared/services/userService';
import '../../../../../src/app/home/pages/UserPage/styles.css';

const UsersConfigPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const users = await fetchUsers();
                setUsers(users);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setMessage('Erro ao buscar usuários');
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
            setMessage('Usuário deletado com sucesso');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            setMessage('Erro ao deletar usuário');
        }
    };

    return (
        <div className="container">
            <h1>Configuração de Usuários</h1>
            {message && <p className="message">{message}</p>}
            {loading ? (
                <p>Carregando usuários...</p>
            ) : (
                <UserList users={users} deleteUser={handleDeleteUser} />
            )}
        </div>
    );
};

export default UsersConfigPage;
