import express from 'express'

const router = express.Router()

//router.get('/taxis', getAllTaxis) // seria la funcion del controller

router.get('/', (_req, res) => {
  res.send('fetching all taxis')
})

router.post('/', (_req, res) => {
  res.send('saving ids taxi')
})

export default router
