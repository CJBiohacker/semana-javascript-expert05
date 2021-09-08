import FileHelper from "./fileHelper.js"
import { logger } from "./logger.js"                                                // Importação do 'logger'.
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))                           // Variável que diz o caminho absoluto para o diretório atual.
const defaultDownloadsFolder = resolve(__dirname, '../', "downloads")
export default class Routes {                                                       // Classe 'Routes' que representa arquivo de rotas do server.
    io
    constructor(downloadsFolder = defaultDownloadsFolder) {
        this.downloadsFolder = downloadsFolder
        this.fileHelper = FileHelper
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
        const files = await this.fileHelper.getFileStatus(this.downloadsFolder)

        response.writeHead(200)
        response.end(JSON.stringify(files))
    }

    handler = (request, response) => {                                              // Configuração de gerenciamento dos métodos (pedido,resposta) 
        response.setHeader('Access-Control-Allow-Origin', '*')
        const chosen = this[request.method.toLowerCase()] || this.defaultRoute      // Conversão para 'lowerCase' para evitar conflito com o nome das funções de rota criadas.

        return chosen.apply(this, [request, response])
    }
}