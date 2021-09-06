import https from 'https';                                                  // Importando o módulo interno do node 'https'
import fs from 'fs';                                                        // Importando o módulo interno do node 'fs' (Nodejs as a File Server)
import { logger } from './logger.js';                                       // Importando a constante 'logger'
import { Server } from 'socket.io';                                         // Importando o módulo de 'Server' do 'socket.io'
import Routes from './routes.js';

const PORT = process.env.PORT || 3000                                       // Constante que leva a especificação da porta 3000 quando solicitada.

const localHostSSL = {                                                      // Constante que recebe um objeto com os certificados de permissão SSL.
    key: fs.readFileSync('./certificates/key.pem'),                         // Método 'fs.readFileSync' que faz a leitura da chave e do certificado de forma SÍNCRONA.
    cert: fs.readFileSync('./certificates/cert.pem'),
}

const routes = new Routes()                                                 // Construtor da classe 'Routes' importada.

const server = https.createServer(                                          // Constante que recebe as configurações de criação do servidor https. 
    localHostSSL,
    routes.handler.bind(routes)                                             // Método 'handler' que descobre a rota que o usuário solicita ao server.
    // Teste de Request e Response básico.
    // (req, res) => {
    //     res.end("Commencing Virtuous Mission... NOW !!!")
    // }
)

const io = new Server(server, {                                             // Constante que recebe um construtor para o 'Socket IO' e recebe o servidor criado 'server' acima.
    cors: {
        origin: '*',
        credentials: false
    }
})

routes.setSocketInstance(io)                                                // Instância de 'io' para emitir e receber eventos.

io.on("conexão",
    (socket) => logger.info(`alguém se conectou: ${socket.id}`))            // Instanciação do 'Socket.io' para conexão com usuário externo.

const startServer = () => {                                                 // Constante que recebe a instanciação do servidor criado.
    const { address, port } = server.address()
    logger.info(`Aplicativo executando no https://${address}:${port}`)
}

server.listen(PORT, startServer);                                           // Cria o servidor como 'listener' sobre a porta 'PORT = 3000' e hostname 'startServer()'

