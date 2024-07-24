import React, { useState, useEffect } from 'react';
import UserList from '../../../../shared/components/ListUser/UserList';
import { User } from '../../../../shared/types/User';
import { fetchUsers, deleteUser, fetchUserById } from '../../../../shared/services/userService';
import '../../../../../src/app/home/pages/UserPage/styles.css';

const UsersConfigPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchId, setSearchId] = useState<string>('');
    const [searchResult, setSearchResult] = useState<User | null>(null);

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

    const handleSearchUser = async () => {
        if (!searchId) return;
        setLoading(true);
        try {
            const user = await fetchUserById(searchId);
            setSearchResult(user);
            setMessage('Usuário encontrado');
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            setMessage('Erro ao buscar usuário');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" data-cy="users-config-page">
            <h1>Configuração de Usuários</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar usuário por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    data-cy="busca"
                />
                <button onClick={handleSearchUser} data-cy="buscar">Buscar</button>
            </div>
            {message && <p className="message" data-cy="message">{message}</p>}
            {loading ? (
                <p data-cy="loading">Carregando...</p>
            ) : searchResult ? (
                <div className="search-result" data-cy="search-result">
                    <p data-cy="result-id">ID: {searchResult.id}</p>
                    <p data-cy="result-nome">Nome: {searchResult.nome}</p>
                    <p data-cy="result-email">Email: {searchResult.email}</p>
                </div>
            ) : (
                <UserList users={users} deleteUser={handleDeleteUser} data-cy="user-list" />
            )}
        </div>
    );
};

export default UsersConfigPage;
