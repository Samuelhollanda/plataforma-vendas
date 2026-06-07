import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Produto } from '../types/produto';

export const ListaProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api.get('/produtos').then(response => {
      setProdutos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Estoque de Produtos</h1>
      <ul>
        {produtos.map(p => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco} (Estoque: {p.quantidade_estoque})
          </li>
        ))}
      </ul>
    </div>
  );
};