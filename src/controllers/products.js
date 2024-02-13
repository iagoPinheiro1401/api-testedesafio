// controller.js
import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../services/products";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const timeout = 10000; // 10 segundos
        const productListPromise = listProducts();
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Tempo limite excedido'));
            }, timeout);
        });

        const productList = await Promise.race([productListPromise, timeoutPromise]);
        res.json(productList);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(400).json({ error: 'Requisição inválida' });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        await deleteProduct(req.params.productId);
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.productId, req.body);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
