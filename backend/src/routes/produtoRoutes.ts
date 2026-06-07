import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();
const produtoController = new ProdutoController();

// Define que requisições POST na raiz desta rota chamarão o método criar do Controller
router.post('/', produtoController.criar.bind(produtoController))

export default router;