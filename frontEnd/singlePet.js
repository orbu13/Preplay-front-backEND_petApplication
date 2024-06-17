let usp = new URLSearchParams (window.location.search)
let petId = usp.get("id")
let singlePetContainer = document.querySelector(".singlePetContainer")

console.log(petId);

function getSinglePet(){
    fetch("http://localhost:3000/pets/" + petId)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
        let name = document.createElement("h2")
        name.innerText = data.data.name
        let species = document.createElement("h4")
        species.innerText = data.data.species
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete Pet"
        deleteButton.id = data.data.id
        deleteButton.addEventListener("click", deletePetFunction)

        singlePetContainer.appendChild(name)
        singlePetContainer.appendChild(species)
        singlePetContainer.appendChild(deleteButton)
    })
}
getSinglePet()

function deletePetFunction (e){
    fetch("http://localhost:3000/pets/"+ e.target.id, {method: "DELETE"}) 
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);
    })
}