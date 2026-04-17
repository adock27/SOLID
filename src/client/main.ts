import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

let myId = '';
let myTurn = false;

// Elements
const lobby = document.querySelector('#lobby') as HTMLElement;
const arena = document.querySelector('#game-arena') as HTMLElement;
const roomStatus = document.querySelector('#room-status') as HTMLElement;
const btnReady = document.querySelector('#btn-ready') as HTMLButtonElement;
const actionsContainer = document.querySelector('#actions') as HTMLElement;
const turnIndicator = document.querySelector('#turn-indicator') as HTMLElement;
const controlsPanel = document.querySelector('#controls') as HTMLElement;
const logContainer = document.querySelector('#log') as HTMLElement;
const winnerModal = document.querySelector('#winner-modal') as HTMLElement;
const winnerName = document.querySelector('#winner-name') as HTMLElement;

// Players cards
const pCards = [
    {
        card: document.querySelector('#p0-card'),
        name: document.querySelector('#p0-name'),
        type: document.querySelector('#p0-type'),
        hp: document.querySelector('#p0-hp'),
        mp: document.querySelector('#p0-mp'),
        en: document.querySelector('#p0-en'),
        def: document.querySelector('#p0-def'),
        active: document.querySelector('#p0-active'),
        passive: document.querySelector('#p0-passive'),
    },
    {
        card: document.querySelector('#p1-card'),
        name: document.querySelector('#p1-name'),
        type: document.querySelector('#p1-type'),
        hp: document.querySelector('#p1-hp'),
        mp: document.querySelector('#p1-mp'),
        en: document.querySelector('#p1-en'),
        def: document.querySelector('#p1-def'),
        active: document.querySelector('#p1-active'),
        passive: document.querySelector('#p1-passive'),
    }
];

socket.on('player:assigned', (data) => {
    myId = data.id;
    roomStatus.innerText = `Conectado como ${data.name}. Esperando rival...`;
});

socket.on('players:update', (players) => {
    roomStatus.innerText = `Jugadores: ${players.length}/2 conectados`;
    if (players.length === 2) {
        roomStatus.innerText = "¡Sala llena! Dale a 'Listo' para empezar.";
    }
});

btnReady.onclick = () => {
    socket.emit('player:ready');
    btnReady.disabled = true;
    btnReady.innerText = "ESPERANDO AL OTRO...";
};

socket.on('game:start', (data) => {
    lobby.style.display = 'none';
    arena.style.display = 'block';
    
    data.players.forEach((p: any, i: number) => {
        updatePlayerUI(i, p.estado);
        pCards[i].name!.innerText = p.name + (p.id === myId ? ' (TÚ)' : '');
    });
});

socket.on('turn:start', (data) => {
    myTurn = data.currentPlayerId === myId;
    
    // Actualizar estados de ambos
    data.gameState.forEach((estado: any, i: number) => {
        updatePlayerUI(i, estado);
    });

    // Resaltar quién tiene el turno
    pCards.forEach((pc, i) => {
        const isThisPlayerTurn = (data.currentPlayerId === socket.id && i === 0) || (data.currentPlayerId !== socket.id && i === 1); 
        // Nota: En el server P1 es index 0, P2 es index 1. 
        // Pero para el cliente local, necesitamos saber quién es quién.
    });
    
    // Forma más simple: El server sabe el ID.
    // Buscamos el index del jugador en el array del server (que enviamos en game:start)
    // Para simplificar, el server enviará los estados en orden.
    
    if (myTurn) {
        controlsPanel.style.display = 'flex';
        turnIndicator.innerText = "¡ES TU TURNO! Elige sabiamente:";
        renderActions(data.actions);
    } else {
        controlsPanel.style.display = 'flex'; // Mostrar siempre para ver el log, pero ocultar botones
        actionsContainer.innerHTML = '';
        turnIndicator.innerText = "Esperando la acción del oponente...";
    }
});

socket.on('game:log', (msg) => {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerText = msg;
    logContainer.prepend(entry);
});

socket.on('game:end', (data) => {
    winnerModal.style.display = 'flex';
    winnerName.innerText = `¡${data.winner} HA GANADO LA BATALLA!`;
});

function updatePlayerUI(index: number, estado: any) {
    if (!estado) return;
    const pc = pCards[index];
    
    const hpPercent = (estado.salud / estado.maxSalud) * 100;
    (pc.hp as HTMLElement).style.width = `${hpPercent}%`;
    (pc.mp as HTMLElement).style.width = `${estado.magia}%`;
    (pc.en as HTMLElement).style.width = `${estado.energia}%`;
    
    pc.def!.innerText = estado.defensaTotal;
    pc.active!.innerText = estado.habilidadActiva || 'Ninguna';
    pc.passive!.innerText = estado.habilidadPasiva || 'Ninguna';

    if (estado.salud <= 0) {
        pc.card!.style.opacity = '0.5';
        pc.card!.style.filter = 'grayscale(1)';
    }
}

function renderActions(actions: any[]) {
    actionsContainer.innerHTML = '';
    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.innerText = action.label;
        btn.onclick = () => {
            socket.emit('action:select', action);
            actionsContainer.innerHTML = '<p>Procesando acción...</p>';
        };
        actionsContainer.appendChild(btn);
    });
}
