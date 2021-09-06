import pino from 'pino'

// Variável que acessa a biblioteca de logging Pino Pretty Print para o NodeJS
const logger = pino({
    prettyPrint: {
        ignore: 'pid, hostname'     // Ignora o Id do Processo e o Hostname.
    }
})

export {
    logger,
}