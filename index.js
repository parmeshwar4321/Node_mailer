const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static('public'))
    // Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.post("/send_email", (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => { console.log(`YOUR SERVER IS RUNNING AT PORT:: ${PORT}`); })