import { logger } from "./logger.js"                                                   // Importação do 'logger'.

export default class Routes {                                                       // Classe 'Routes' que representa arquivo de rotas do server.
    io
    constructor() {
    }

    setSocketInstance(io) {
        this.io = io
    }

    async defaultRoute(request, response) {                                         // Método que faz a rota do pedido e resposta entre server e usuário.
        response.end(`DEFAULT_ROUTE: Olá Mundo 1 !!!`)
    }

    async options(request, response) {                                              // Rota de pedido de método 'https OPTIONS'.
        response.writeHead(204)
        response.end(`OPTIONS: Olá Mundo 2 !!!`)
    }

    async post(request, response) {                                                 // Rota de pedido de método 'https POST'.
        logger.info('post')
        response.end()
    }

    async get(request, response) {                                                  // Rota de pedido de método 'https GET'.
        logger.info('get')
        response.end()
    }

    handler(request, response) {                                                    // 
        response.setHeader('Acess-Control-Allow-Origin', '*')
        const chosen = this[request.method.toLowerCase()] || this.defaultRoute

        chosen()
        return chosen.apply(this, [request, response])
    }
}