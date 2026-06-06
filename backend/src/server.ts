import express, {Request, Response} from 'express';

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'sucesso',
        message: 'Backend em TS rodando com Docker!'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});