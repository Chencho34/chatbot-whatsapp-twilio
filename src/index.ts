import bodyParser from 'body-parser'
import axios from 'axios'


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const TWILIO_ACCOUNT_SID = process.env.TWILIO_SID!
const TWILIO_AUTH_TOKEN = process.env.TWILIO_TOKEN!
const FROM = 'whatsapp:+14155238886'
const TO = 'whatsapp:+522721305556'

app.get('/', (_, res) => res.send('Hello world!'))

// app.post('/whatsapp', async (req: Request, res: Response) => {
//   const message = (req.body.Body || '').toLowerCase()
//   let reply = 'No entendí tu mensaje 🤔'

//   if (message.includes('productos')) {
//     reply = 'Hola soy yami en que puedo ayudarte'
//   }

//   // Enviar un template de Twilio (opcional)
//   // const TO = req.body.From // enviar respuesta al que escribió
//   console.log(TO)
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`

//   const data = new URLSearchParams({
//     From: FROM,
//     To: TO,
//     ContentSid: 'HX668f7abd624c62d3b80f112dae2af749'
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

//   res.set('Content-Type', 'text/xml')
//   res.send(`
//     <Response>
//       <Message>${reply}</Message>
//     </Response>
//   `)
// })

const hola =' hola'

app.post('/whatsapp', async (req: Request, res: Response) => {
  const TO = req.body.From // responde al que envió el mensaje
  const data = new URLSearchParams({
    From: FROM,
    To: TO,
    ContentSid: 'HX0052b586690e45519d8dbd2d4f51fa51'
  })

  try {
    const result = await axios.post(url, data, {
      auth: {
        username: TWILIO_ACCOUNT_SID!,
        password: TWILIO_AUTH_TOKEN!
      }
    })
    console.log('Twilio response:', result.data)
  } catch (err: any) {
    console.error('Error enviando template:', err.response?.data || err.message)
  }

  res.set('Content-Type', 'text/xml')
  res.send('<Response></Response>')
})


app.listen(3000, () => console.log('Bot corriendo en http://localhost:3000'))
