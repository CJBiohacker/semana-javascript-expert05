import { describe, test, expect } from '@jest/globals'              // Importando os 3 métodos globais do Jest: 'describe', 'teste' e 'expect'; 
import Routes from '../../src/routes.js';                           // Importando do Routes.

describe('#Jest Basic Test', () => {                                // Método global 'describe' do Jest que cria um bloco para agrupar testes.
    test('#Test 1', () => {
        expect(true).toBeTruthy()                                   // true = Pass | false = Failed
    })
})

describe('#Route Test Suite', () => {                               // Teste do método 'setSocketInstance' declarado através de um construtor de classe.
    describe('#setSocketInstance Test', () => {
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
})

