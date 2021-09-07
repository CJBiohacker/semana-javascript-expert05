import {                                                        // Importando os 3 métodos globais do Jest: 'describe', 'teste' e 'expect'; 
    describe,
    test,
    expect
} from '@jest/globals'

describe('#Teste de execução básica do Jest', () => {           // Método global 'describe' do Jest que cria um bloco para agrupar testes.
    test('#teste teste', () => {
        expect(true).toBeTruthy()                               // true = Pass | false = Failed
    })
})