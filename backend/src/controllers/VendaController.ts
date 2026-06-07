import { Request, Response } from "express";
import { VendaService } from "../services/VendaService";

const vendaService = new VendaService();

export class VenderController {
    async realizarvenda(req: Request, res: Response) {
        try {
            const { produtoId, quantidade, valorTotal } = req.body;

            if (!produtoId || !quantidade || !valorTotal) {
                return res.status(400).json({ erro: 'Preencha todos os campos da venda (produtoId, quantidade, valorTotal)' });
            }

            const venda = await vendaService.realizarVenda(produtoId, quantidade, valorTotal);

            return res.status(201).json(venda);
        } catch (error: any) {
            console.error(error);

            if (error.message === 'Produto não encontrado.' || error.message === 'Estoque insuficiente para realizar esta venda.') {
                return res.status(400).json({ erro: 'Erro interno ao realizar a venda.' });
            }

            return res.status(500).json({ erro: 'Erro interno ao realizar a venda.' });
        }
    }

    async listarVendas(req: Request, res: Response) {
        try {
            const vendas = await vendaService.listarVendas();

            return res.status(200).json(vendas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro interno ao buscar o histórico de vendas.' });
        }
    }
}