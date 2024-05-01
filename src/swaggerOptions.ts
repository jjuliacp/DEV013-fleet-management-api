export const options = { // opciones de swagger
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Fleet Management API',
            version: '2.0.0',
            description: "Documentación Fleet Management Api"
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
        ],
    },
    apis:["./src/routes/*"] // importar archivos de routes en general
}