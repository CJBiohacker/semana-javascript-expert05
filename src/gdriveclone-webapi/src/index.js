import https from 'https';                                  // Importando o módulo interno do node 'https'

const PORT = process.env.PORT || 3000                       // Constante que leva a especificação da porta 3000 quando solicitada.

const localHostSSL = {                                      // Constante que recebe um objeto com os certificados de permissão SSL.
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem'),

}

const server = https.createServer(                          // Constante que recebe um objeto com os certificados de permissão SSL.
    localHostSSL,
    (req, res) => {
        res.end
    }
)