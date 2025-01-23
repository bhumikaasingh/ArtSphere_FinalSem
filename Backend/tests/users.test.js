const { default: mongoose } = require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const User = require('../models/User')

const api=supertest(app)

const user={
    username:"testuser1",
    password:"testpassword1"
}

beforeAll(async ()=>{
    await User.deleteMany({})
})

test('User registration',async ()=>{
    await api.post('/users/')
    .send({fname:"test1",lname:"user1",username:"testuser1",email:"testuser@gmail.com",password:"testpassword1" })
    .expect(201)
    .expect(res=>{
        expect(res.body.status).toContain('User registered successfully')
    })
})


test('User login',async ()=>{
    await api.post('/users/login')
    .send(user)
    .expect(200)
    .expect(res=>{
        expect(res.body.status).toContain('Login success')
    })
})


test ('get all products',async ()=>{
    await api.get('/products/')
    .expect(200)
    .expect(res=>{
        expect(res.body.success).toBe(true)
    })
})

test ('get product by id',async ()=>{
    await api.get('/products/63fc38d2827a3e54c513182e')
    .expect(200)
    .expect(res=>{
        expect(res.body.success).toBe(true)
    })
}
)

test ('get category by id',async ()=>{
    await api.get('/category/63d748de294fa164189ca61f')
    .expect(200)
    .expect(res=>{
        expect(res.body.success).toBe(true)
    })
}
)

test ('get all category',async ()=>{
    await api.get('/category/')
    .expect(200)
    .expect(res=>{
        expect(res.body.success).toBe(true)
    })
}
)
afterAll(async ()=>{
    await mongoose.connection.close()

})

