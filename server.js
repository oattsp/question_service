const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const ADMIN_USER = process.env.ADMIN_USER
const SECRET = process.env.SECRET

const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: SECRET,
}
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   if(payload.sub === ADMIN_USER) {
        done(null, true)
   }
   else {
        done(null, false)
   }
})

const passport = require('passport')
passport.use(jwtAuth)

const requireJWTAuth = passport.authenticate('jwt',{session:false})

app.get('/question', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Questions.findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/question/:id', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Questions.findOne({
            where: {'id': req.params.id}
        })
        if (result) {
            res.status(200).json(result)  
        } else {
            res.status(404).json({
                message: 'question not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.post('/question', requireJWTAuth, async (req, res) => {
    try {
        const quesion = await db.Questions.create(req.body)
        res.status(201).json(quesion)  
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.put('/question/:id', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Questions.findOne({
            where: {'id': req.params.id}
        })
        if (!result) {
            return res.status(404).json({
                message: 'product not found!!'
            })
        }

        const quesion = await db.Questions.update(req.body, {
            where: {'id': result.id}
        })

        if ([quesion]) {
            const updateQuestion = await db.Questions.findByPk(result.id)
            res.status(200).json(updateQuestion)  
        } else {
            throw new Error('update product failure!!')
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})
 
app.delete('/question/:id', requireJWTAuth, async (req, res) => {
    try {
        const deleted = await db.Questions.destroy({
            where: {'id': req.params.id}
        })
        if (deleted) {
            res.status(204).json({
                message: 'question deleted'
            })  
        } else {
            res.status(404).json({
                message: 'question not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, ()=>{
    console.log(`on PORT: ${PORT}`)
    console.log(`on ENV: ${ENV}`)
    console.log('question service is running')
})