import prisma from "../config/prisma";

export class VendaService {
    async realizarVenda(produtoId: string, quantidadeVendida: number, valorTotal: number) {
        const produto = await prisma.produto.findUnique({
            where: { id: produtoId },
        });

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        if (produto.quantidade_estoque < quantidadeVendida) {
            throw new Error('Estoque insuficiente para realizar esta venda.');
        }

        const resultado = await prisma.$transaction([
            //cria o registro da venda
            prisma.venda.create({
                data: {
                    quantidade: quantidadeVendida,
                    valorTotal: valorTotal,
                    produto: {
                        connect: {
                            id: produtoId
                        }
                    }
                },
            }),

            //diminui o estoque do produto
            prisma.produto.update({
                where: { id: produtoId },
                data: {
                    quantidade_estoque: {
                        decrement: quantidadeVendida,
                    },
                },
            }),
        ]);

        return resultado[0];
    }
}