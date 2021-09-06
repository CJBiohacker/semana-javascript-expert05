import https from 'https';                                  // Importando o módulo interno do node 'https'
import fs from 'fs';                                        // Importando o módulo interno do node 'fs' (Nodejs as a File Server)
import logger from './logger';                              // Importando a constante 'logger'

const PORT = process.env.PORT || 3000                       // Constante que leva a especificação da porta 3000 quando solicitada.

const localHostSSL = {                                      // Constante que recebe um objeto com os certificados de permissão SSL.
    key: fs.readFileSync('./certificates/key.pem'),         // Método 'fs.readFileSync' que faz a leitura da chave e do certificado de forma SÍNCRONA.
    cert: fs.readFileSync('./certificates/cert.pem'),
}

const server = https.createServer(                          // Constante que recebe as configurações de criação do servidor https. 
    localHostSSL,
    (req, res) => {                                         // Teste de Request e Response básico.
        res.end("Commencing Virtuous Mission... NOW !!!")
    }
)

const startServer = () => {                                 // Constante que recebe a instanciação do servidor criado.
    const { address, port } = server.address()
    logger.info(`Aplicativo executando no https://${address}:${port}`)
}
