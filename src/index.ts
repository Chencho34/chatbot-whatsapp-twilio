import bodyParser from 'body-parser'
import express, { 
  type Request,
  type Response
} from 'express'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (_, res) => {
  res.send('Hello world!')
})

app.post('/whatsapp', (req: Request, res: Response) => {
  const message = req.body.Body
  // const from = req.body.From    

  let reply = 'No entendí tu mensaje 🤔'

  if (message.toLowerCase().includes('productos')) {
    reply = 'Hola aqui te muestro algunos productos'
  }

  if (message.toLowerCase().includes('hola')) {
    reply = '¡Hola! Soy tu chatbot de prueba 🚀 hola yami como estas'
  }

  if (message.toLowerCase().includes('telefonos')) {
    reply = 'Aquí te recomendamos algunos teléfonos que pueden interesarte'
  }

  res.set('Content-Type', 'text/xml')
  res.send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `)
})

app.listen(3000, () => console.log('Bot corriendo en http://localhost:3000'))
