import express from "express"
import http from "http"
import path from "path"
import calculatePI, { calculatePI2 } from "./utils/picalculation"

const app = express()
const server = http.createServer(app)
const host = "localhost"
const port = 8000
let globeDigit = 0
let respond = 0

app.set("view engine", "html")
app.disable("x-powered-by")
app.get("/", (req, res) => {
    if(globeDigit< 10){
        respond = calculatePI(parseInt(10))
        res.send({ calculatePI: respond });
        globeDigit = 10
    }else{
        res.send({ calculatePI: respond });
    }
})
app.use(express.static(path.join(__dirname, "../public")))


app.get("/decimal", (req, res) => {
    if(parseInt(req.query.digit)>globeDigit){
        console.log(req.query.digit)
        respond = calculatePI(parseInt(req.query.digit))
        res.send({ calculatePI: respond });
        globeDigit = parseInt(req.query.digit)
    }else{
        res.send({ calculatePI: respond });
    }
})

app.get("/solar",(req, res) =>{
    res.sendFile(path.join(__dirname,"../public", "index.html"))
})

server.listen(port, host, () => {
    console.log(`Server is now running on ${host}:${port}`)
})
