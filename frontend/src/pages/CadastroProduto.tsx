import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";

export const CadastroProduto = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/produtos', {
                nome: nome,
                preco: parseFloat(preco),
                quantidade_estoque: parseInt(quantidade, 10)
            });

            alert('Produto cadastrado com sucesso!');

            setNome('');
            setPreco('');
            setQuantidade('');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar produto. Verifique o console.');
        }
    };

    return(
        <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Cadastrar Novo Produto</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
                <div>
                    <label> Nome do Produto</label>
                    <input 
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                     />
                </div>

                <div>
                    <label>Preço (R$): </label>
                    <input 
                        type="number"
                        step={"0.01"}
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Quantidade inical: </label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px', cursor: 'pointer'}}>
                    Salvar Produto
                </button>
            </form>
        </div>
    )
}