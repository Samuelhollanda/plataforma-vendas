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
            return res.status(500).json({ erro: 'Erro interno no servidor ao criar produto.'})
        }
    }
}