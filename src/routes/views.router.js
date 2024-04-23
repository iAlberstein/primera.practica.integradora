const express = require("express");
const router = express.Router(); 
const ProductModel = require("../models/product.model");

async function obtenerProductos() {
    try {
        const productos = await ProductModel.find();
        return productos.map(producto => ({
            title: producto.title,
            description: producto.description,
            price: producto.price,
            img: producto.img
        }));
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

router.get("/", async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.render("home", { productos: productos });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

router.get("/chat", async (req, res) => {
    res.render("chat");
});

module.exports = router;
