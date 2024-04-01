import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import {fileURLToPath} from "url";


//fastify
const types = ['Тонке', 'ЯкУмами','SUPER']
const sizes = [26, 30, 40]
const DB = [
    {
        id: 0,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC3FE7B4C4EFD80FBF1F0919F8302.webp",
        title: "М'ясна Пепероні Фреш з перцем",
        
        price: 803,
        category: 1,
        rating: 4,
    },
    {
        id: 1,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EE873B1ECB2867A7CDCCCD92CCDE16.webp",
        title: "М'ясна Гавайська З Джалапеньо",
        price: 245,
        category: 1,
        rating: 6,
    },
    {
        id: 2,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC406296416A28C969A56BCD61E8F.webp",
        title: "М'ясна Чотири сезони Веганська",
        price: 295,
        category: 1,
        rating: 4,
    },
    {
        id: 3,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC3FE2E7B10F2A5C8F1BB8850774F.webp",
        title: "Овочева Кисло-солодкий курятінг",
        price: 275,
        category: 2,
        rating: 2,
    },
    {
        id: 4,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EE873AD32412959D337561A2F0CDC7.webp",
        title: "Овочева Чізбургер-піца Люкс",
        price: 415,
        category: 2,
        rating: 8,
    },
    {
        id: 5,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC4025D7CF3C8B88A96A6A0A3FCA2.webp",
        title: "Овочева Пепероні Тріумфальна",
        price: 675,
        category: 2,
        rating: 9,
    },
    {
        id: 6,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC3FF45A7635BB6C9C1EE7928D7C0.webp",
        title: "Гостра Крейзі пепероні",
        price: 580,
        category: 3,
        rating: 2,
    },
    {
        id: 7,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC3FF45A7635BB6C9C1EE7928D7C0.webp",
        title: "Гостра Пепероні Шалений",
        price: 675,
        category: 3,
        rating: 9,
    },
    {
        id: 8,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC406517DEC038C4566A0DB17C4C5.webp",
        title: "Гриль Маргарита Класична",
        price: 450,
        category: 4,
        rating: 10,
    },
    {
        id: 9,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EE8746504C56EFAAFC18476258243A.webp",
        title: "Чотири пори року Гриль Магічний",
        price: 395,
        category: 4,
        rating: 10,
    },
    {
        id: 10,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC402C8FAF642A8487C09E6CCC00E.webp",
        title: "Овочі та гриби Гастроном",
        price: 285,
        category: 4,
        rating: 7,
    },
    {
        id: 11,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EEC3FF8BA2BFD9B91717F63DB64762.webp",
        title: "Маргарита Повна Гармонія",
        price: 450,
        category: 3,
        rating: 10,
    },
    {
        id: 12,
        imageUrl:
            "https://media.dodostatic.net/image/r:760x760/11EE8739E8CFE38496F94922A0F5EDC9.webp",
        title: "Маргарита Оптимальна",
        price: 450,
        category: 3,
        rating: 10,
    },
];

const server = fastify();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.register(fastifyStatic, {
    root: path.join(__dirname, "../build"),
});

const port = process.env.PORT || 1234;
const host = process.env.HOST || "0.0.0.0";

server.get("/pizzas/sorted", async (request, reply) => {
    const { sortBy, filterByCategory, filterBySearch, limitItemOnPage, numberPage } = request.query;
    const currentPg= +numberPage
    
    let sortedPizzas = [...DB];
    
    // Сортування піц
    switch (sortBy) {
        case '0':
            sortedPizzas.sort((a, b) => b.rating - a.rating);
            
            break;
        case '1':
            sortedPizzas.sort((a, b) => a.price - b.price);
            break;
        case '2':
            sortedPizzas.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    // Фільтрація за категорією
    if (+filterByCategory) {
        sortedPizzas = sortedPizzas.filter((pizza) => pizza.category === +filterByCategory);
    }

    // Пошук за назвою
    if (filterBySearch.trim()) {
        sortedPizzas = sortedPizzas.filter((pizza) => pizza.title.toLowerCase().includes(filterBySearch.trim().toLowerCase()));
    }
    
    // Пагінація
    const totalPizzas = sortedPizzas.length;
    const totalPages = Math.ceil(totalPizzas / limitItemOnPage);
    const startIndex = numberPage * limitItemOnPage;
    const endIndex = startIndex + parseInt(limitItemOnPage, 10);
    const paginatedPizzas = sortedPizzas.slice(startIndex, endIndex)
    reply.send({ pizzas: paginatedPizzas, totalPages ,sizes,types ,currentPg });
});

server.setNotFoundHandler((request, reply) => {
    return reply.sendFile("index.html");
});

server
    .listen({port, host})
    .then(() => {
        console.log(`Server listening at http://localhost:${port}/`);
    })
    .catch((err) => {
        console.error("Error starting server:", err);
        process.exit(1);
    });

