const express = require("express");
const router = express.Router(); 
const ProductModel = require("../models/product.model");

// Esta función se utiliza para obtener los productos desde la base de datos MongoDB
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

// Ruta para la página de inicio que muestra los productos
router.get("/", async (req, res) => {
    try {
        // Obtener los productos utilizando la función obtenerProductos
        const productos = await obtenerProductos();
        // Renderizar la vista "home" con los productos obtenidos
        res.render("home", { productos: productos });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Otras rutas para diferentes páginas
router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

router.get("/chat", async (req, res) => {
    res.render("chat");
});

module.exports = router;
