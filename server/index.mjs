import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

//fastify


const server = fastify()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

server.register(fastifyStatic,{
    root: path.join(__dirname, '../build')
})


const port = process.env.PORT ||  1234
const host = process.env.HOST  || '0.0.0.0'

console.log(host,port)
server.listen({port,host},)
.then(() => {
    console.log(`http://localhost:1234/`)
})

server.get('/stat', async (request, reply) => {
    // Отримання даних POST-запиту
    const data = request.body;
    // Обробка даних
    // ...
    
   
    // reply.send(Object.fromEntries(getUniqWordsInMap(data)));
    reply.send({ message: 'hello world and pizza' });
})

//websocket
const wss = new WebSocketServer({ server: server.server })

wss.on('connection',client => { // event if client connection to server
    client.on('message', (data)=> {
        const parsedData = JSON.parse(data);
        wss.clients.forEach(c => {
            c.send(JSON.stringify({ received: true, data: parsedData }))
            // if (c !== client) {
                
            // }

        })
    })
})
