import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();
const produtoController = new ProdutoController();

// Define que requisições POST na raiz desta rota chamarão o método criar do Controller
router.post('/', produtoController.criar.bind(produtoController));

router.patch('/:id/estoque', produtoController.adicionarEstoque.bind(produtoController));

router.get('/', produtoController.listar.bind(produtoController));

export default router;