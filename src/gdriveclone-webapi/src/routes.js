import { logger } from "./logger"                               // Importação do 'logger'.

export default class Routes {                                   // Classe 'Routes' que representa arquivo de rotas do server.
    io
    constructor() {
    }

    setSocketInstance(io) {
        this.io = io
    }

    async defaultRoute(request, response) {                     // Método que faz o pedido e resposta entre server e usuário.
        response.end(`DEFAULT_ROUTE: Olá Mundo 1 !!!`)
    }

    async options(request, response) {                          // 
        response.writeHead(204)
        response.end(`OPTIONS: Olá Mundo 2 !!!`)
    }

    async post(request, response) {                             // 
        logger.info('post')
        response.end(`POST`)
    }

    async get(request, response) {                              // 
        logger.info('get')
        response.end(`GET`)
    }

    handler(request, response) {                                // 
        response.setHeader('Acess-Control-Allow-Origin', '*')
        const chosen = this[request.method.toLowerCase()] || this.defaultRoute

        chosen()
        return chosen.apply(this, [request, response])
    }
}