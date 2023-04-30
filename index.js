const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const RedisStore = require("connect-redis").default
const {createClient} = require("redis")

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config")

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:27017?authSource=admin`

const connectWithRetry = () => {

    mongoose
        .connect(MONGO_URI)
        .then(()=>console.log("connected to DB"))
        .catch((err)=>{
            console.log(err)
            setTimeout(connectWithRetry, 5000)
        })

}

connectWithRetry();

// Initialize client.
let redisClient = createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
})

redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient
})

// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
  })
)

app.use(express.json())


app.get('/', (req, res) => {
    res.send("<h2>Hello Docker Updated 10!!</h2>")
})


app.use("/posts", postRouter)
app.use("/users", userRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})