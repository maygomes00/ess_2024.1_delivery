import React, { useState, useEffect } from 'react';
import UserForm from '../../forms/UserForm';
import UserList from '../../../../shared/components/ListUser/UserList';
import { User } from '../../../../shared/types/User';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../../../shared/services/userService';
import '../../../../../src/app/home/pages/UserPage/styles.css';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await fetchUsers();
                setUsers(users);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };
        getUsers();
    }, []);

    const handleAddUser = async (user: User) => {
        try {
            const newUser = await addUser(user);
            setUsers([...users, newUser]);
            setMessage('Usuário adicionado com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            setMessage('Erro ao adicionar usuário');
        }
    };

    const handleUpdateUser = async (updatedUser: User) => {
        try {
            await updateUser(updatedUser);
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setMessage('Usuário atualizado com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            setMessage('Erro ao atualizar usuário');
        }
    };

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
            <h1>REGISTRO</h1>
            {message && <p className="message">{message}</p>}
            <UserForm addUser={handleAddUser} updateUser={handleUpdateUser} deleteUser={handleDeleteUser} editUser={editUser} setEditUser={setEditUser} />
            <UserList users={users} setEditUser={setEditUser} deleteUser={handleDeleteUser} />
        </div>
    );
};

export default UsersPage;
