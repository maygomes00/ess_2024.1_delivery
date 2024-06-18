import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import TestRepository from '../repositories/test.repository';

interface Pedido {
  order_id: number;
  data: string;
  itens: {
    produto_id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

interface Cliente {
  id: string;
  nome: string;
  email: string;
  password: string;
  telefone: string;
  endereco: string;
  pedidos?: Pedido[];
}

const testRepository = new TestRepository();

// Caminhos dos arquivos JSON
const clienteFilePath = path.resolve('./src/data/users/users.json');

// Função para ler e analisar JSON de um arquivo
const readJsonFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Função para escrever JSON em um arquivo
const writeJsonFile = (filePath: string, data: { clientes: Cliente[] }): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const getNextClienteId = (clientes: Cliente[]): string => {
  const maxId = clientes.reduce((max, cliente) => {
    const idNum = parseInt(cliente.id, 10);
    return idNum > max ? idNum : max;
  }, 0);
  return (maxId + 1).toString();
};

// Função utilitária para lidar com erros
const handleError = (error: unknown, res: Response, message: string) => {
  if (error instanceof Error) {
    console.error(message, error.message);
  } else {
    console.error("Erro desconhecido:", message);
  }
  res.status(500).json({
    error: "Erro interno do servidor"
  });
};

export const clienteGetAllJson = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!fs.existsSync(clienteFilePath)) {
      console.error("File not found:", clienteFilePath);
      res.status(404).json({ error: "File not found" });
      return;
    }

    const data = readJsonFile(clienteFilePath);

    if (!data.clientes) {
      console.log('Clientes vazia!');
      res.status(200).json([]);
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    handleError(error, res, "Erro em clienteGetAllJson:");
  }
};

export const clienteGetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteId = req.params.id;
    const data: { clientes: Cliente[] } = readJsonFile(clienteFilePath);

    const cliente = data.clientes.find(cliente => cliente.id === clienteId);

    if (!cliente) {
      res.status(404).json({ error: "Cliente não encontrado!" });
      return;
    }

    res.status(200).json(cliente);
  } catch (error) {
    handleError(error, res, "Erro em clienteGetById:");
  }
};

export const clienteAddJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const nomeCliente = req.body.nome?.trim();
    const emailCliente = req.body.email?.trim();
    const passwordCliente = req.body.password?.trim();
    const telefoneCliente = req.body.telefone?.trim();
    const enderecoCliente = req.body.endereco?.trim();
    const pedidosCliente: Pedido[] = req.body.pedidos ?? [];

    if (!nomeCliente || nomeCliente.length === 0 || !emailCliente || emailCliente.length === 0 || !passwordCliente || passwordCliente.trim().length === 0 || !telefoneCliente || telefoneCliente.length === 0 || !enderecoCliente || enderecoCliente.length === 0) {
      res.status(400).json({ error: "Todos os campos são obrigatórios!" });
      return;
    }

    const data: { clientes: Cliente[] } = readJsonFile(clienteFilePath);

    const existingCliente = data.clientes.find(cliente => cliente.email === emailCliente);
    if (existingCliente) {
      res.status(400).json({ error: "Já existe um cliente com esse email!" });
      return;
    }

    const newCliente: Cliente = {
      id: getNextClienteId(data.clientes),
      nome: nomeCliente,
      email: emailCliente,
      password: passwordCliente,
      telefone: telefoneCliente,
      endereco: enderecoCliente,
      pedidos: pedidosCliente
    };

    data.clientes.push(newCliente);

    writeJsonFile(clienteFilePath, data);

    res.status(201).json(newCliente);
  } catch (error) {
    handleError(error, res, "Erro em clienteAddJson:");
  }
};

export const clienteUpdateJson = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Iniciando atualização de cliente...");

    const data: { clientes: Cliente[] } = readJsonFile(clienteFilePath);
    console.log("Dados lidos do arquivo JSON:", data);

    const clienteId = req.params.id;
    const newName = req.body.nome;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const newTelefone = req.body.telefone;
    const newEndereco = req.body.endereco;
    const newPedidos: Pedido[] = req.body.pedidos;

    console.log(`Atualizando cliente ID: ${clienteId}`);

    if (!newName || newName.trim().length === 0 || !newEmail || newEmail.trim().length === 0 || !newPassword || newPassword.trim().length === 0 || !newTelefone || newTelefone.trim().length === 0 || !newEndereco || newEndereco.trim().length === 0) {
      res.status(400).json({ error: "Todos os campos são obrigatórios!" });
      return;
    }

    const clienteIndex = data.clientes.findIndex(cliente => cliente.id === clienteId);

    if (clienteIndex === -1) {
      res.status(404).json({ error: "Cliente não encontrado!" });
      return;
    }

    const emailExists = data.clientes.some(cliente => cliente.email.toLowerCase() === newEmail.toLowerCase() && cliente.id !== clienteId);

    if (emailExists) {
      res.status(400).json({ error: "Já existe um cliente com esse email!" });
      return;
    }

    data.clientes[clienteIndex].nome = newName;
    data.clientes[clienteIndex].email = newEmail;
    data.clientes[clienteIndex].password = newPassword;
    data.clientes[clienteIndex].telefone = newTelefone;
    data.clientes[clienteIndex].endereco = newEndereco;
    data.clientes[clienteIndex].pedidos = newPedidos;

    writeJsonFile(clienteFilePath, data);
    console.log("Cliente atualizado com sucesso:", data.clientes[clienteIndex]);

    res.status(200).json(data.clientes[clienteIndex]);
  } catch (error) {
    handleError(error, res, "Erro em clienteUpdateJson:");
  }
};

export const clienteDeleteJson = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteId = req.params.id;

    if (!fs.existsSync(clienteFilePath)) {
      console.error("Arquivo de cliente não encontrado:", clienteFilePath);
      res.status(404).json({ error: "Cliente não encontrado!" });
      return;
    }

    const clienteData: { clientes: Cliente[] } = readJsonFile(clienteFilePath);
    const clienteIndex = clienteData.clientes.findIndex(cliente => cliente.id === clienteId);

    if (clienteIndex === -1) {
      console.error("Cliente não encontrado com ID:", clienteId);
      res.status(404).json({ error: "Cliente não encontrado!" });
      return;
    }

    clienteData.clientes = clienteData.clientes.filter(cliente => cliente.id !== clienteId);

    writeJsonFile(clienteFilePath, clienteData);
    console.log("Cliente deletado com sucesso!");
    res.status(200).json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    handleError(error, res, "Erro em clienteDeleteJson:");
  }
};

// Função para obter os pedidos de um cliente
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteId = req.params.id;
    const data: { clientes: Cliente[] } = readJsonFile(clienteFilePath);

    const cliente = data.clientes.find(cliente => cliente.id === clienteId);

    if (!cliente) {
      res.status(404).json({ error: "Cliente não encontrado!" });
      return;
    }

    const orders = cliente.pedidos || [];
    if (orders.length === 0) {
      res.status(200).json({ message: "Não há pedidos registrados para o perfil" });
      return;
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getUserOrders:", error instanceof Error ? error.message : 'Erro desconhecido');
    res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
};
