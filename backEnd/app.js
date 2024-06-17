let express = require ("express")
let app = express()
let bodyParser = require ("body-parser")
let cors = require ("cors")

let pets = []

app.use(cors({origin: "*"}))
app.use(bodyParser.json())

app.get("/", function(req,res){
    return res.json({massage: "Welcome to backEnd"})
})

app.get("/pets", function(req,res){
    return res.status(200).json({massage: "success", data: pets})
})

app.get("/pets/:petId", function(req, res){
    console.log(req.params.petId);
    let foundPet = pets.find(function(pet){
        return pet.id === +req.params.petId

    })
    console.log(foundPet);
    if(foundPet != undefined){
        return res.json({message: "success", data: foundPet})
    }else{
        return res.status(404).json({message: "pet not found"})
    }
})

app.post("/pets", function(req,res){
    let newPet = req.body
    pets.push(newPet)
    return res.status(201).json({massage: "success", data: newPet})
})

app.delete("/pets/:petId", function(req,res){
    let petToDelete = pets.findIndex(function(pet){
        return pet.id === +req.params.petId
    })
    if(petToDelete < 0){
        return res.status(404).json({message: "pet not found"})
    }else{
        pets.splice(petToDelete, 1)
        return res.json({message: "pet was deleted successfully"})
    }
})

app.listen(3000, function(){
    console.log("serverPort-3000");
})