import pino from 'pino'                 // Importando o módulo interno 'pino' para o 'nodejs'.

const logger = pino({                   // Constante que acessa a biblioteca de logging Pino Pretty Print para o NodeJS
    prettyPrint: {
        ignore: 'pid, hostname'         // Ignora o Id do Processo e o Hostname.
    }
})

export {                                // Exporta a constante 'logger' para uso externo.
    logger,
}