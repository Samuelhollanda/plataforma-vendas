export interface Produto {
    id: string,
    nome: string,
    descricao?: string,
    preco: number,
    quantidade_estoque: number;
}