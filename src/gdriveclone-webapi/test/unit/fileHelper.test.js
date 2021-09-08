import { describe, test, expect, jest } from '@jest/globals'                                   // Importando os 3 métodos globais do Jest: 'describe', 'teste' e 'expect'; 
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';

import Routes from '../../src/routes.js';


describe('#FileHelper Test', () => {                                                           // Teste Jest do conjunto do FileHelper.

    describe('#getFiletStatus Test', () => {                                                   // Teste Jest do método 'getFiletStatus.
        test("it should return file statuses in correct", async () => {

            const statMock = {
                dev: 66306,
                mode: 33204,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 1712779,
                size: 499719,
                blocks: 984,
                atimeMs: 1631051910007.6746,
                mtimeMs: 1610410847000,
                ctimeMs: 1631051904095.6487,
                birthtimeMs: 1628625145477.3994,
                atime: '2021-09-07T21:58:30.008Z',
                mtime: '2021-01-12T00:20:47.000Z',
                ctime: '2021-09-07T21:58:24.096Z',
                birthtime: '2021-08-10T19:52:25.477Z'
            }

            const mockUser = 'carlos'
            process.env.USER = mockUser
            const fileName = 'testfile.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([fileName])

            jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock)

            const result = await FileHelper.getFileStatus("/tmp")

            const expectedResult = [
                {
                    size: '500 kB',
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: fileName
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${fileName}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})