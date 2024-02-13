import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../services/products";

const router = Router();

const timeout = 30000; // 30 segundos

// Função para envolver uma promise com um timeout
function timeoutPromise(promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Tempo limite excedido'));
        }, timeout);

        promise.then(
            (res) => {
                clearTimeout(timer);
                resolve(res);
            },
            (err) => {
                clearTimeout(timer);
                reject(err);
            }
        );
    });
}

router.get('/', async (req, res) => {
    try {
        const productList = await timeoutPromise(listProducts());
        res.json(productList);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await timeoutPromise(createProduct(req.body));
        res.status(201).json(product);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(400).json({ error: 'Requisição inválida' });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        await timeoutPromise(deleteProduct(req.params.productId));
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const updatedProduct = await timeoutPromise(updateProduct(req.params.productId, req.body));
        res.json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
