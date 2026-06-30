import api from "../services/api";
import type { Produto } from "../types/produto";
import { useState, useEffect } from "react";
import type {FormEvent} from "react";


export const RealizarVenda = () => {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produtoId, setProdutoId] = useState("")
    const [quantidade, setQuantidade] = useState("")

    useEffect(() => {
        api.get('/produtos')
        .then(response => {
            setProdutos(response.data);
        })
        .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //1 - encontra o produto selecionado para descobrir o preço dele
        const produtoSelecionado = produtos.find(p => p.id === produtoId);

        if (!produtoSelecionado) {
            alert("Seleccione um produto válido");
            return;
        }

        const qtd = parseInt(quantidade, 10)

        //2 - calcula o valor total automaticamente
        const valorTotal = produtoSelecionado.preco * qtd

        try {
            // dispara a transação para o backend
            await api.post('/vendas', {
                produtoId: produtoId,
                quantidade: qtd,
                valorTotal: valorTotal
            });

            alert(`Venda realizada com sucesso! Valor Total: R$ ${valorTotal.toFixed(2)}`);

            // Limpa os campos após a venda
            setProdutoId("")
            setQuantidade("")
        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.erro || 'erro ao realizar a venda');
        }
    }
    return(
        <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Realizar Venda (PDV)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
                <div>
                    <label>Selecione o Produto</label>
                    <select
                        value={produtoId}
                        onChange={(e) => setProdutoId(e.target.value)}
                        required
                        style={{ width: '100%', padding: "5px" }}
                    >
                        <option value="" disabled>Selecione o Produto</option>
                        {produtos.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nome} - R$ {p.preco} (Estoque: {p.quantidade_estoque})
                            </option>
                        ))}
                    </select>
                </div>

                <div>

                </div>
            </form>
        </div>
    )
}