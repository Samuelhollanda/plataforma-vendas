import { ListaProdutos } from "./pages/ListarProdutos"
import { CadastroProduto } from "./pages/CadastroProduto"
import { RealizarVenda} from "./pages/RealizarVenda.tsx";

function App() {

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Gestão - Plataforma de Vendas</h1>
      
      {/* O nosso novo formulário de criação */}
      <CadastroProduto />
      
      <hr />
      
      {/* A lista de produtos que já criámos */}
      <ListaProdutos />

      <hr />

      <RealizarVenda />
    </div>
  )
}

export default App