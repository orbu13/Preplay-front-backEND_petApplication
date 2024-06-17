const petForm = document.querySelector("#petForm")
petForm.addEventListener("submit", createPet)

const container = document.querySelector(".container")
function getPet(){
    fetch("http://localhost:3000/pets")
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        data.data.forEach(element => {
        let petName = document.createElement("a")
        petName.addEventListener("click", function(){
            window.location.href = "./singlePet.html?id=" + element.id

        })
        petName.innerText = "name: " + element.name

        let species = document.createElement("p")
        species.innerText = "species: " + element.species
        
        container.appendChild(petName)
        container.appendChild(species)

        });
    })
}
getPet()

function createPet(e){
    e.preventDefault()
    let petName = document.querySelector("#petName")
    let petSpecies = document.querySelector("#petSpecies")

    if(petName.value  === "" ||  petSpecies.value === ""){
        alert("Enter both pat name & species")
    }else if(petName.value.length < 3 || petSpecies.value.length < 3){
        alert("Pet name and pet species most be at least 3 characters long")
    }else{
        fetch("http://localhost:3000/pets", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: petName.value, species: petSpecies.value, id: Math.floor(Math.random()*100000)})})
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(data);
        })
    }
}
