const express = require("express");
const router = express.Router(); 
const ProductModel = require("../models/product.model");

router.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 3;

    try {
        const productos = await ProductModel.paginate({}, {limit, page});
        console.log("Productos obtenidos:", productos);

        const productosResultadoFinal = productos.docs.map(producto => {
            const {_id, ...rest} = producto.toObject();
            return rest;
        });

        res.render("home", { 
            productos: productosResultadoFinal,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages
        });
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
