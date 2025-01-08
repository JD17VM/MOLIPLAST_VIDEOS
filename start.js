const { spawn } = require('child_process');
const path = require('path');

// Ejecuta el servidor Express
const server = spawn('node', [path.join(__dirname, 'backend', 'server.js')], {
    shell: true,
    stdio: 'inherit',
});

// Ejecuta el servidor Vite
const vite = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    shell: true,
    stdio: 'inherit',
});

// Maneja el cierre de ambos procesos
const cleanUp = () => {
    console.log('Cerrando servidores...');
    server.kill();
    vite.kill();
};

process.on('SIGINT', cleanUp);
process.on('SIGTERM', cleanUp);
