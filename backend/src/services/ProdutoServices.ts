import prisma from "../config/prisma";

export class ProdutoService {
    async criarProduto(data: { nome: string; preco: number; quantidade_estoque?: number; descricao?: string }) {
        const produto = await prisma.produto.create({
            data: {
                nome: data.nome,
                preco: data.preco,
                quantidade_estoque: data.quantidade_estoque || 0,
                descricao: data.descricao,
            },
        });
    
        return produto;
    }

    async adcionarEstoque(id: string, quantidadeAdcionada: number) {
        const produtoAtualizado = await prisma.produto.update({
            where: {
                id: id,
            },
            data: {
                quantidade_estoque: {
                    increment: quantidadeAdcionada,
                },
            },
        });

        return produtoAtualizado;
    }

    async listarProdutos() {
            const produtos = await prisma.produto.findMany({
                orderBy: {
                    criadoEm: 'desc',
                }
            });

            return produtos;
    }
}