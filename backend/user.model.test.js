const db = require('./mockDB')
const Books = require('./models/booksModel')
const booksRoute = require('./routes/booksRoute')

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Books test', ()=>{
    it('Get 1 book', async(done)=>{
        
    })
})