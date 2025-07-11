const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate(
    'blogs', 
    {title: 1, url: 1, likes: 1}
  )
  response.json(users)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  console.log('Received password:', password, 'Type:', typeof password)
  if (typeof password !== 'string' || password.length < 3) {
    return response.status(400).json({ error: 'The password must be a string with at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


module.exports = usersRouter