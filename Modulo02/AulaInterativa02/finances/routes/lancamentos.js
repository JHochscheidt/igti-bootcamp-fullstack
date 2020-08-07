import express from "express";
import { inserirLancamento, totalMes } from "../controllers/lancamentosController.js";

const router = express.Router();

router.post("/receita", async (req, res) => {
    res.send(await inserirLancamento(req.body));    
});

router.post("/despesa", async (req, res) => {
    res.send(await inserirLancamento(req.body, "D"));    
});

router.get("/totalMes/:mes", async (req, res) => {
    res.send(await totalMes(parseInt(req.params.mes))); 
});

export default router;