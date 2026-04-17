import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { initRegistry } from './core/bootstrapper.js';
import { HeroeFactory } from './core/factories/HeroeFactory.js';
import { HabilidadFactory } from './core/factories/HabilidadFactory.js';
import { Heroe } from './core/entities/Heroe.js';

initRegistry();

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

interface Player {
    id: string;
    name: string;
    heroe?: Heroe;
    ready: boolean;
}

let players: Player[] = [];
let currentIndex = 0;
let gameStarted = false;

const HERO_TYPES = ['GUERRERO', 'MAGO', 'TANQUE'];
const ACTIVES = ['FUEGO', 'ESPADA', 'RAYO', 'CURACION'];
const PASSIVES = ['ROBLE', 'CASCO_DIAMANTE'];

function getRandomActions() {
    const allOptions = [
        ...ACTIVES.map(a => ({ type: 'EQUIP_ACTIVE', id: a, label: `Equipar ${a}` })),
        ...PASSIVES.map(p => ({ type: 'EQUIP_PASSIVE', id: p, label: `Equipar ${p}` })),
        { type: 'ATTACK', id: 'ATTACK', label: '¡ATACAR!' }
    ];
    
    // Mezclar y tomar 3
    return allOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
}

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    if (players.length >= 2) {
        socket.emit('error', 'La partida está llena');
        socket.disconnect();
        return;
    }

    const newPlayer: Player = {
        id: socket.id,
        name: `Jugador ${players.length + 1}`,
        ready: false
    };
    players.push(newPlayer);

    socket.emit('player:assigned', { id: socket.id, name: newPlayer.name });
    io.emit('players:update', players.map(p => ({ id: p.id, name: p.name, ready: p.ready })));

    socket.on('player:ready', () => {
        const p = players.find(pl => pl.id === socket.id);
        if (p) {
            p.ready = true;
            // Asignar héroe al azar
            const randomHeroType = HERO_TYPES[Math.floor(Math.random() * HERO_TYPES.length)];
            p.heroe = HeroeFactory.crearHeroe(randomHeroType, p.name);
            p.heroe.init();
            
            io.emit('players:update', players.map(pl => ({ 
                id: pl.id, 
                name: pl.name, 
                ready: pl.ready,
                heroeType: randomHeroType 
            })));

            checkStartGame();
        }
    });

    socket.on('action:select', (action) => {
        if (!gameStarted) return;
        const currentPlayer = players[currentIndex];
        if (currentPlayer.id !== socket.id) return;

        const otherPlayer = players[(currentIndex + 1) % 2];
        const h = currentPlayer.heroe!;
        
        let logMsg = "";

        switch (action.type) {
            case 'EQUIP_ACTIVE':
                h.setHabilidadActiva(HabilidadFactory.crearActiva(action.id));
                logMsg = `${h.nombre} equipó ${action.id}`;
                break;
            case 'EQUIP_PASSIVE':
                h.setHabilidadPasiva(HabilidadFactory.crearPasiva(action.id));
                logMsg = `${h.nombre} obtuvo ${action.id}`;
                break;
            case 'ATTACK':
                h.actuar(otherPlayer.heroe);
                logMsg = `${h.nombre} realizó una acción de combate`;
                break;
        }

        io.emit('game:log', logMsg);
        checkWinCondition();
        
        if (gameStarted) {
            nextTurn();
        }
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        players = players.filter(p => p.id !== socket.id);
        gameStarted = false;
        io.emit('players:update', players.map(p => ({ id: p.id, name: p.name, ready: p.ready })));
        io.emit('game:reset');
    });
});

function checkStartGame() {
    if (players.length === 2 && players.every(p => p.ready)) {
        gameStarted = true;
        currentIndex = Math.random() > 0.5 ? 0 : 1;
        io.emit('game:start', {
            players: players.map(p => ({
                id: p.id,
                name: p.name,
                estado: p.heroe?.getEstado()
            })),
            startingPlayerId: players[currentIndex].id
        });
        nextTurn();
    }
}

function nextTurn() {
    currentIndex = (currentIndex + 1) % 2;
    const actions = getRandomActions();
    io.emit('turn:start', {
        currentPlayerId: players[currentIndex].id,
        actions: actions,
        gameState: players.map(p => p.heroe?.getEstado())
    });
}

function checkWinCondition() {
    const loser = players.find(p => p.heroe && p.heroe.getEstado().salud <= 0);
    if (loser) {
        const winner = players.find(p => p !== loser);
        io.emit('game:end', { winner: winner?.name, loser: loser.name });
        gameStarted = false;
    }
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor de batalla corriendo en http://localhost:${PORT}`);
});
