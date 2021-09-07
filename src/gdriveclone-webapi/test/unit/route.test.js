import { describe, test, expect, jest } from '@jest/globals'                                   // Importando os 3 métodos globais do Jest: 'describe', 'teste' e 'expect'; 
import Routes from '../../src/routes.js';                                                      // Importando do Routes.

describe('#Jest Basic Test', () => {                                                           // Método global 'describe' do Jest que cria um bloco para agrupar testes.
    test('#Test 1', () => {
        expect(true).toBeTruthy()                                                              // true = Pass | false = Failed
    })
})

describe('#Routes Test Suite', () => {                                                         // Teste Jest do conjunto de métodos da classe 'Route'
    const defaultParams = {
        request: {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: '',
            body: {}
        },
        response: {
            setHeader: jest.fn(),
            writeHead: jest.fn(),
            end: jest.fn(),
        },
        values: () => Object.values(defaultParams)
    }

    describe('#setSocketInstance Test', () => {                                                // Teste Jest do método 'setSocketInstance' declarado através de um construtor de classe.
        test("#setSocket should store 'io' instance", () => {
            const routes = new Routes()
            const ioObj = {
                to: (id) => ioObj,
                emit: (event, message) => { }
            }
            routes.setSocketInstance(ioObj)
            expect(routes.io).toStrictEqual(ioObj)
        })
        test('#Test 1', () => {
            expect(true).toBeTruthy()
        })
    })

    describe('#handler Test', () => {                                                          // Teste Jest do método 'handler' exportado do arquivo de configuração das rotas 'routes.js'.


        test("given an inexistent route it should choose 'defaultRoute'", async () => {              // Teste do método 'defaultRoute'.
            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = 'inexistent'
            await routes.handler(...params.values())
            expect(params.response.end).toHaveBeenCalledWith('DEFAULT_ROUTE: Olá Mundo 1 !!!')

        })

        test('it should set any request with CORS enabled', async () => {                            // Teste do 'responde.setHeader' do método gerenciador 'handler'.
            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = 'inexistent'
            await routes.handler(...params.values())
            expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
        })

        test("given method OPTIONS it should choose 'options' route", async () => {             // Teste do método 'options'.
            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = 'OPTIONS'
            await routes.handler(...params.values())
            expect(params.response.writeHead).toHaveBeenCalledWith(204)
            expect(params.response.end).toHaveBeenCalled()

        })

        test("given method POST it should choose 'post' route", async () => {                   // Teste do método 'post'.
            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = 'POST'
            jest.spyOn(routes, routes.post.name).mockResolvedValue()

            await routes.handler(...params.values())
            expect(routes.post).toHaveBeenCalled()
        })

        test("given method GET it should choose 'get' route", async () => {                      // Teste do método 'get'.
            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = 'GET'
            jest.spyOn(routes, routes.get.name).mockResolvedValue()

            await routes.handler(...params.values())
            expect(routes.get).toHaveBeenCalled()
        })
    })

    describe('#get Test', () => {
        test("given method GET it should list all files downloaded", async () => {

            const fileStatusesMock = [
                {
                    size: 499719,
                    birthtime: '2021-08-10T19:52:25.477Z',
                    owner: 'carlos',
                    file: 'testfile.png'
                }
            ]
        })
    })
})
