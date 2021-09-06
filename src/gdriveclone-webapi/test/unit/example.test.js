import {
    describe,
    test,
    expect
} from '@jest/global'

describe('#Teste de execução básica do Jest', () => {
    test('#teste teste', () => {
        expect(false).toBeTruthy()
    })
})