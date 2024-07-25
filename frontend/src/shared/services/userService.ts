import { User, Pedido } from "../types/User";

const API_URL = "http://localhost:5001/users";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }
  const data = await response.json();
  return data.clientes;
};

export const addUser = async (user: User): Promise<User> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Erro ao adicionar usuário");
  }
  const newUser = await response.json();
  return newUser;
};

export const updateUser = async (updatedUser: User): Promise<void> => {
  const response = await fetch(`${API_URL}/${updatedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar usuário");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao deletar usuário");
  }
};

export const getUserOrders = async (id: string): Promise<Pedido[]> => {
  const response = await fetch(`${API_URL}/${id}/orders`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Erro ao pegar histórico de pedidos do usuário");
  }
  const result = await response.json();
  if (result.message === "Não há pedidos registrados para o perfil") {
    return [];
  }
  return result;
};

// Nova função para buscar usuário por ID
export const fetchUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }
  const user = await response.json();
  return user;
};

// Nova função para adicionar pedido ao usuário
export const addUserOrder = async (userId: string, produtoId: string): Promise<Pedido> => {
  const response = await fetch(`${API_URL}/${userId}/${produtoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Erro ao adicionar pedido");
  }
  const newOrder = await response.json();
  return newOrder;
};
