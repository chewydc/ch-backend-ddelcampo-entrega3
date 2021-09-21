//-------------------------------------------------------------------
// Desafio Entregable N°3: Servidor con Express
// Fecha de entrega tope: 24-09-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const Contenedor = require ("./Contenedor.js");
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

let productosVarios='Cargando...'
a = new Contenedor("productos.txt")

//Inicio configuracion servidor web
app.get('/productos',async (req,res)=> {
    productosVarios=await a.getAll()
    res.json(productosVarios)
})

app.get('/productoRandom',async (req,res)=> {
    res.json(await a.getById(Math.floor(Math.random() * (productosVarios.length-2)) + 1))
})

const server = app.listen(PORT, () => {
console.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
