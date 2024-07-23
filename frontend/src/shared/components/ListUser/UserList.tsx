// src/shared/components/ListUser/UserList.tsx
import React from 'react';
import { User } from '../../types/User';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../../app/home/pages/UserPage/styles.css';

interface UserListProps {
    users: User[];
    deleteUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, deleteUser }) => {
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Tem certeza que deseja deletar este usuário?');
        if (confirmed) {
            deleteUser(id);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/users/config/edit/${id}`);
    };

    return (
        <Table striped bordered hover responsive className="mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>{user.telefone}</td>
                        <td>{user.endereco}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEdit(user.id)} className="action-button edit">Editar</Button>
                            <Button variant="danger" onClick={() => handleDelete(user.id)} className="action-button delete">Deletar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UserList;
