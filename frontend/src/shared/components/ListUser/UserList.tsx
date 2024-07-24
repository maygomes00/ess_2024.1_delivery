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
        <Table striped bordered hover responsive className="mt-4" data-cy="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Password</th> {/* Nova coluna para password */}
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id} data-cy={`user-row-${user.id}`}>
                        <td data-cy={`user-id-${user.id}`}>{user.id}</td>
                        <td data-cy={`user-nome-${user.id}`}>{user.nome}</td>
                        <td data-cy={`user-email-${user.id}`}>{user.email}</td>
                        <td data-cy={`user-telefone-${user.id}`}>{user.telefone}</td>
                        <td data-cy={`user-endereco-${user.id}`}>{user.endereco}</td>
                        <td data-cy={`user-password-${user.id}`}>{user.password}</td> {/* Exibindo a password */}
                        <td>
                            <Button 
                                variant="warning" 
                                onClick={() => handleEdit(user.id)} 
                                className="action-button edit" 
                                data-cy={`edit-button-${user.id}`}
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={() => handleDelete(user.id)} 
                                className="action-button delete" 
                                data-cy={`delete-button-${user.id}`}
                            >
                                Deletar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UserList;
