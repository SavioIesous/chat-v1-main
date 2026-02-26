const { WebSocketServer } = require("ws");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const express = require("express"); // Você precisará dar 'npm i
dotenv.config();

const port = process.env.PORT || 3000;

// 1. Cria um servidor HTTP simples para o Render não dar erro de "Upgrade"
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor de Chat Online');
});

// 2. Acopla o WebSocket ao servidor HTTP
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === 1) { // Verifica se o cliente está aberto
                client.send(data.toString());
            }
        });
    });

    console.log("Cliente conectado");
});

// 3. O servidor HTTP escuta na porta do Render
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});