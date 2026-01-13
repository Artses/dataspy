import express from 'express';
import path from 'path';
import cors from "cors";
import routes from "./src/routes/router.js";
import "dotenv/config";
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

const port = process.env.PORT || 3000;
const ip = process.env.IP || 'localhost';

app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m', ` 
  ╔════════════════════════════════════════════════════════════╗
  ║  ██████╗  █████╗ ████████╗ █████╗ ███████╗██████╗ ██╗   ██╗║
  ║  ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝██╔══██╗╚██╗ ██╔╝║
  ║  ██║  ██║███████║   ██║   ███████║███████╗██████╔╝ ╚████╔╝ ║
  ║  ██║  ██║██╔══██║   ██║   ██╔══██║╚════██║██╔═══╝   ╚██╔╝  ║
  ║  ██████╔╝██║  ██║   ██║   ██║  ██║███████║██║        ██║   ║
  ║  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝        ╚═╝   ║
  ╚════════════════════════════════════════════════════════════╝
  `);
  
  console.log('\x1b[32m%s\x1b[0m', '✨ DataSpy - Sistema de Monitoramento para Banco de Dados');
  console.log('\x1b[33m%s\x1b[0m', `🌐 URL: http://${ip}:${port}`);
  console.log('\x1b[35m%s\x1b[0m', `⏰ ${new Date().toLocaleString()}`);
  console.log('\x1b[36m%s\x1b[0m', '═'.repeat(64));
});