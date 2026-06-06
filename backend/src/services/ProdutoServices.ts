import prisma from "../config/prisma";

export class ProdutoService {
    async criarProduto(data: { nome: string; preco: number; quantidade_estoque?: number; descricao?: string }) {
        
    }
}