import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoServices";

// Instanciamos o serviço para poder utilizá-lo
const produtoService = new ProdutoService();

export class ProdutoController {
    async criar(req: Request, res: Response) {
        try {
            const { nome, preco, quantidade_estoque, descricao } = req.body;

            if (!nome || preco === undefined) {
                return res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
            }

            // Chama o Service passando os dados
            const novoProduto = await produtoService.criarProduto({
                nome,
                preco,
                quantidade_estoque,
                descricao,
            });
            // Retorna sucesso (Status 201: Created)
            return res.status(201).json(novoProduto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno no servidor ao criar produto.' })
        }
    }

    async adicionarEstoque(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ erro: 'O ID do produto é inválido' });
            }

            if (quantidade === undefined || typeof quantidade !== 'number' || quantidade <= 0) {
                return res.status(400).json({ erro: 'Envie uma uantidade válida maior que zero.' });
            }

            const produto = await produtoService.adcionarEstoque(id, quantidade);

            return res.status(200).json(produto);
        } catch (error: any) {
            // P2025 = codigo de erro especifico do prisma uanbdo não acha o id no banco
            if (error.code === 'P2025') {
                return res.status(404).json({ erro: 'Produto não encontrado.' });
            }

            console.error(error);
            return res.status(500).json({ error: 'Erro interno ao ataluizar o estoque.' });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const produtos = await produtoService.listarProdutos();

            return res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno ao listar produtos. '});
        }
    }
}