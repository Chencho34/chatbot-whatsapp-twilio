import bodyParser from 'body-parser'
import express, { 
  type Request,
  type Response
} from 'express'



// SE OBTIENES DESDE EL DASHBOARD DE TWILIO
const TWILIO_ACCOUNT_SID = process.env.TWILIO_SID!
const TWILIO_AUTH_TOKEN = process.env.TWILIO_TOKEN!

// SANBOX QUE OFRECE TWILIO PARA CONECTARSE AL BOT
const FROM = 'whatsapp:+14155238886'

// TELEFONO CHENCHO
const TO = 'whatsapp:+522721305556'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (_, res) => {
  res.send('Hello world!')
})



// TUVE PROBLEMAS CON LA ISNTALACION DE AXIOS, ESTA RUTA NO FUNCIONA NO FUNCINA AUN
// app.post('/whatsapp-flow', async (req: Request, res: Response) => {
//   const message = (req.body.Body || '').toLowerCase()
//   let reply = 'No entendí tu mensaje 🤔'

//   const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`

//   const data = new URLSearchParams({
//     From: FROM,
//     To: TO,
//     ContentSid: 'HX668f7abd624c62d3b80f112dae2af749', // ID DEL TEMPLATE CREADO EN TWILIO OJO, DEBE ESTAR APROBADO
//     ContentVariables: JSON.stringify({   // OPCIONAL, SOLO SI SE ENVIA UN FLOW, DE NO SE ASI SE OMITE ESTE PARAMETRO Y SOLO ENIVAMOS EL TEMPLATE
//       flow_id: 'FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Flow SID si aplica, OJO TAMBIEN DEBE SER APROBADO
//     })
//   })

//   try {
//     const result = await axios.post(url, data, {
//       auth: {
//         username: TWILIO_ACCOUNT_SID,
//         password: TWILIO_AUTH_TOKEN
//       }
//     })
//      console.log('Twilio response:', result.data)
//   } catch (err) {
//     console.error('Error enviando template:', err)
//   }
// }


// BLOQUE PARA CONECTARSE AL BOT TWILIO , SI FUNCIONA 
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
