const mongoose = require('mongoose');
const fastify = require('fastify')({
    logger:true
});
const routes = require('./route/route');
fastify.register(require('fastify-cors'), {
    origin: 'http://localhost:3000',
    methods: 'POST'
});
mongoose.connect('mongodb://localhost/recaptcha',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected!');
}).catch((err) => {
    console.log("Error: "+err);
})
//
fastify.get('/', (req,res) => {
    res.send("Hello from the backend!");
});
//Sync-up for routes
Object.values(routes).forEach((item) => {
    item.forEach((route) => {
        fastify.route(route);
    });
});
//

//Start
const start = async () => {
    fastify.listen(process.env.PORT||5000, '0.0.0.0')
    .then((address) => {
        console.log(`Server has started on ${address} `)
    })
    .catch((err) => {
        console.log("Error: "+err);
        process.exit(1);
    })
};

start();