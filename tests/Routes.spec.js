const { checkRouteExists, routes } = require('./helperTestFunctions')

jest.mock('mongodb', () => {
    const mockCollection = {
        insertOne: jest.fn().mockResolvedValue({}),
        findOne: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([])
        }),
        updateOne: jest.fn().mockResolvedValue({}),
        deleteOne: jest.fn().mockResolvedValue({})
    }

    const mockDb = {
        collection: jest.fn().mockReturnValue(mockCollection)
    }

    const mockClient = {
        connect: jest.fn().mockResolvedValue({}),
        close: jest.fn().mockResolvedValue({}),
        db: jest.fn().mockReturnValue(mockDb)
    }

    return {
        MongoClient: jest.fn(() => mockClient)
    }
})


describe('Check routes exist', () => {  
    describe('Check basic routes', () => {
        it(routes.ping, async () => {
            expect(await checkRouteExists(routes.ping)).toBe(true)
        })
        it(routes.list, async () => {
            expect(await checkRouteExists(routes.list)).toBe(true)
        })
    })

    describe('Check login route', () => {
        it(routes.login, async () => {
            expect(await checkRouteExists(routes.login)).toBe(true)
        })
    })

    describe('Check register route', () => {
        it(routes.register.default, async () => {
            expect(await checkRouteExists(routes.register.default)).toBe(true)
        })
        it(routes.register.exists, async () => {
            expect(await checkRouteExists(routes.register.exists)).toBe(true)
        })
    })

    describe('Check content route', () => {
        it(routes.content.about, async () => {
            expect(await checkRouteExists(routes.content.about)).toBe(true)
        })
    })

    describe('Check user route', () => {
        it(routes.user.delete, async () => {
            expect(await checkRouteExists(routes.user.delete)).toBe(true)
        })
        it(routes.user.following, async () => {
            expect(await checkRouteExists(routes.user.following)).toBe(true)
        })

        describe('Check user get route', () => {
            it(routes.user.get.username, async () => {
                expect(await checkRouteExists(routes.user.get.username)).toBe(true)
            })
            it(routes.user.get.email, async () => {
                expect(await checkRouteExists(routes.user.get.email)).toBe(true)
            })
            it(routes.user.get.profession, async () => {
                expect(await checkRouteExists(routes.user.get.profession)).toBe(true)
            })
            it(routes.user.get.stats, async () => {
                expect(await checkRouteExists(routes.user.get.stats)).toBe(true)
            })
        })

        describe('Check user set route', () => {
            it(routes.user.set.username, async () => {
                expect(await checkRouteExists(routes.user.set.username)).toBe(true)
            })
            it(routes.user.set.email, async () => {
                expect(await checkRouteExists(routes.user.set.email)).toBe(true)
            })
            it(routes.user.set.profession, async () => {
                expect(await checkRouteExists(routes.user.set.profession)).toBe(true)
            })
            it(routes.user.set.unfollow, async () => {
                expect(await checkRouteExists(routes.user.set.unfollow)).toBe(true)
            })
            it(routes.user.set.password, async () => {
                expect(await checkRouteExists(routes.user.set.password)).toBe(true)
            })
        })
    })

    describe('Check posts route', () => {
        it(routes.posts.default, async () => {
            expect(await checkRouteExists(routes.posts.default)).toBe(true)
        })
        it(routes.posts.create, async () => {
            expect(await checkRouteExists(routes.posts.create)).toBe(true)
        })
        it(routes.posts.delete, async () => {
            expect(await checkRouteExists(routes.posts.delete)).toBe(true)
        })
        it(routes.posts.edit, async () => {
            expect(await checkRouteExists(routes.posts.edit)).toBe(true)
        })
    })
})