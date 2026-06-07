import { Router } from 'express';
import { VenderController } from '../controllers/VendaController';

const router = Router();
const vendaController = new VenderController();

router.post('/', vendaController.realizarvenda.bind(vendaController));
router.get('/', vendaController.listarVendas.bind(vendaController));


export default router;