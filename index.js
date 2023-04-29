const express = require("express")
const mongoose = require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP } = require("./config/config")

const postRouter = require("./routes/postRoutes")

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
app.use(express.json())


app.get('/', (req, res) => {
    res.send("<h2>Hello Docker Updated 10!!</h2>")
})


app.use("/posts", postRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})