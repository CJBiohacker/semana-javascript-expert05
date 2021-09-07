import { logger } from "./logger.js"                                                // Importação do 'logger'.

export default class Routes {                                                       // Classe 'Routes' que representa arquivo de rotas do server.
    io
    constructor() {
    }

    setSocketInstance(io) {
        this.io = io
    }

    defaultRoute = async (request, response) => {                                   // Método que faz a rota do pedido e resposta entre server e usuário.
        response.end(`DEFAULT_ROUTE: Olá Mundo 1 !!!`)
    }

    options = async (request, response) => {                                        // Rota de pedido de método 'https OPTIONS'.
        response.writeHead(204)
        response.end(`OPTIONS: Olá Mundo 2 !!!`)
    }

    post = async (request, response) => {                                           // Rota de pedido de método 'https POST'.
        logger.info('post')
        response.end()
    }

    get = async (request, response) => {                                            // Rota de pedido de método 'https GET'.
        logger.info('get')
        response.end()
    }

    handler = (request, response) => {                                              // Configuração de gerenciamento dos métodos (pedido,resposta) 
        response.setHeader('Access-Control-Allow-Origin', '*')
        const chosen = this[request.method.toLowerCase()] || this.defaultRoute      // Conversão para 'lowerCase' para evitar conflito com o nome das funções de rota criadas.

        return chosen.apply(this, [request, response])
    }
}