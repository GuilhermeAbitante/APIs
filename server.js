import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/categorias', async (req, res) => {
    const { descricao } = req.body;
    
    try {
        const novaCategoria = await prisma.categorias_produtos.create({
            data: { descricao }
        });
        res.status(201).json(novaCategoria);
    } catch (error) {
        console.error("Erro ao cadastrar categoria:", error);
        res.status(500).json({ error: "Erro ao cadastrar categoria." });
    }
});

app.get('/categorias', async (req, res) => {
    try {
        const categorias = await prisma.categorias_produtos.findMany();
        res.status(200).json(categorias);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        res.status(500).json({ error: "Erro ao listar categorias." });
    }
});

app.put('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;

    try {
        const categoriaAtualizada = await prisma.categorias_produtos.update({
            where: { codigo: parseInt(id) },
            data: { descricao }
        });
        res.status(200).json(categoriaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        res.status(500).json({ error: "Erro ao atualizar categoria." });
    }
});

app.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.categorias_produtos.delete({
            where: { codigo: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        res.status(500).json({ error: "Erro ao deletar categoria." });
    }
});

app.post('/localidades', async (req, res) => {
    const { nome } = req.body;

    try {
        const novaLocalidade = await prisma.localidades.create({
            data: { nome }
        });
        res.status(201).json(novaLocalidade);
    } catch (error) {
        console.error("Erro ao cadastrar localidade:", error);
        res.status(500).json({ error: "Erro ao cadastrar localidade." });
    }
});

app.get('/localidades', async (req, res) => {
    try {
        const localidades = await prisma.localidades.findMany();
        res.status(200).json(localidades);
    } catch (error) {
        console.error("Erro ao listar localidades:", error);
        res.status(500).json({ error: "Erro ao listar localidades." });
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome_completo, data_nascimento, altura_cm, localidade_id } = req.body;

    try {
        const novoUsuario = await prisma.usuarios.create({
            data: {
                nome_completo,
                data_nascimento: new Date(data_nascimento),
                altura_cm,
                localidade_id
            }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuarios.findMany({
            include: { localidade: true }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ error: "Erro ao listar usuários." });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_completo, data_nascimento, altura_cm, localidade_id } = req.body;

    try {
        const usuarioAtualizado = await prisma.usuarios.update({
            where: { codigo: parseInt(id) },
            data: { nome_completo, data_nascimento: new Date(data_nascimento), altura_cm, localidade_id }
        });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.usuarios.delete({
            where: { codigo: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
});

app.post('/produtos', async (req, res) => {
    const { nome_produto, preco_unitario, estoque, categoria_produto_id } = req.body;

    try {
        const novoProduto = await prisma.itens_produtos.create({
            data: {
                nome_produto,
                preco_unitario,
                estoque,
                categoria_produto_id
            }
        });
        res.status(201).json(novoProduto);
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        res.status(500).json({ error: "Erro ao cadastrar produto." });
    }
});

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await prisma.itens_produtos.findMany({
            include: { categoria_produto: true }
        });
        res.status(200).json(produtos);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(500).json({ error: "Erro ao listar produtos." });
    }
});

app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_produto, preco_unitario, estoque, categoria_produto_id } = req.body;

    try {
        const produtoAtualizado = await prisma.itens_produtos.update({
            where: { codigo: parseInt(id) },
            data: { nome_produto, preco_unitario, estoque, categoria_produto_id }
        });
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: "Erro ao atualizar produto." });
    }
});

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.itens_produtos.delete({
            where: { codigo: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ error: "Erro ao deletar produto." });
    }
});

app.post('/ordens', async (req, res) => {
    const { data_hora, endereco_entrega, usuario_id } = req.body;

    try {
        const novaOrdem = await prisma.ordens.create({
            data: {
                data_hora: new Date(data_hora),
                endereco_entrega,
                usuario_id
            }
        });
        res.status(201).json(novaOrdem);
    } catch (error) {
        console.error("Erro ao cadastrar ordem:", error);
        res.status(500).json({ error: "Erro ao cadastrar ordem." });
    }
});

app.get('/ordens', async (req, res) => {
    try {
        const ordens = await prisma.ordens.findMany({
            include: { usuario: true }
        });
        res.status(200).json(ordens);
    } catch (error) {
        console.error("Erro ao listar ordens:", error);
        res.status(500).json({ error: "Erro ao listar
