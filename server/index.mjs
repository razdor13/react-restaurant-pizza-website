import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

//fastify
const BD = [
    {
        "id": 0,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
        "title": "Пепероні Фреш з перцем",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 803,
        "category": 0,
        "rating": 4
    },
    {
        "id": 1,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
        "title": "Сирна піца",
        "types": [0],
        "sizes": [26, 40],
        "price": 245,
        "category": 0,
        "rating": 6
    },
    {
        "id": 2,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
        "title": "Ципленок барбекю",
        "types": [0],
        "sizes": [26, 40],
        "price": 295,
        "category": 1,
        "rating": 4
    },
    {
        "id": 3,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
        "title": "Кисло-солодкий ципленок",
        "types": [1],
        "sizes": [26, 30, 40],
        "price": 275,
        "category": 2,
        "rating": 2
    },
    {
        "id": 4,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
        "title": "Чізбургер-піца",
        "types": [0, 1, 2],
        "sizes": [26, 30, 40],
        "price": 415,
        "category": 3,
        "rating": 8
    },
    {
        "id": 22,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
        "title": "Пепероні",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 675,
        "category": 1,
        "rating": 9
    },
    {
        "id": 5,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg",
        "title": "Крейзі пепероні",
        "types": [0],
        "sizes": [30, 40],
        "price": 580,
        "category": 2,
        "rating": 2
    },
    {
        "id": 6,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
        "title": "Пепероні",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 675,
        "category": 1,
        "rating": 9
    },
    {
        "id": 15,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
        "title": "Маргарита",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 450,
        "category": 4,
        "rating": 10
    },
    {
        "id": 8,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
        "title": "Чотири пори року",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 395,
        "category": 5,
        "rating": 10
    },
    {
        "id": 9,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/30367198-f3bd-44ed-9314-6f717960da07.jpg",
        "title": "Овочі та гриби 🌱",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 285,
        "category": 5,
        "rating": 7
    },
    {
        "id": 7,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
        "title": "Маргарита",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 450,
        "category": 4,
        "rating": 10
    },
    {
        "id": 12,
        "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
        "title": "Маргарита",
        "types": [0, 1],
        "sizes": [26, 30, 40],
        "price": 450,
        "category": 4,
        "rating": 10
    }
]

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
    reply.send(BD);
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
