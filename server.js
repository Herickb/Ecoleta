const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const db = require('./database/db')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.set("view engine", "njk")

nunjucks.configure("views", {
    express:app,
    autoescape: false,
    noCache: true
})

app.get("/", function(req,res){
    return res.render("home")
})

app.get("/create", function(req,res){

    

    return res.render("create")
})

app.post("/create", (req,res) => {

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items  
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create", {saved: true})
    }

    db.run(query,values, afterInsertData)

})

app.get("/search", function(req,res){

    const search = req.query.search

    if(search == ""){
        return res.render("404")
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        
        return res.render("search", {places: rows, total})
    })

    
})

app.listen(5000, function(req,res){
    console.log("server is running")
})