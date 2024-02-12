import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsController from "./controllers/products";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors()); // Configuração básica do CORS para permitir todas as origens
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productsController);

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});


  