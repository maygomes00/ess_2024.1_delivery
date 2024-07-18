import React from 'react';
import { User } from '../../types/User';
import { Table, Button } from 'react-bootstrap';
import '../../../app/home/pages/UserPage/styles.css';

interface UserListProps {
    users: User[];
    setEditUser: (user: User | null) => void;
    deleteUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, setEditUser, deleteUser }) => {
    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Tem certeza que deseja deletar este usuário?');
        if (confirmed) {
            deleteUser(id);
        }
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
                            <Button variant="warning" onClick={() => setEditUser(user)} className="action-button">Editar</Button>
                            <Button variant="danger" onClick={() => handleDelete(user.id)} className="action-button delete">Deletar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UserList;
