let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector('#toy-collection')
  const addToyForm = document.querySelector('.add-toy-form')

  //fetch toys from database
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyArray => toyArray.forEach(toy => displayToys(toy)))

  //create HTML to display toys on the DOM
  const displayToys = (toy) => {
    toyCollectionDiv.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
      <button data-id=${toy.id} class="delete-btn">Delete</button>
    </div>
    `
  };

  //capture user input and update database
  addToyForm.addEventListener('submit', function(event){
    event.preventDefault()
    let toyName = event.target.name.value
    let toyImage = event.target.image.value

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0 
      })
    })
    .then(response => response.json())
    .then(newToy => createNewToy(newToy))
  });

  //create new toy html and slap it on the DOM
  const createNewToy = (newToy) => {
    toyCollectionDiv.innerHTML += `
    <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button data-id=${newToy.id} class="like-btn">Like <3</button>
      <button data-id=${newToy.id} class="delete-btn">Delete</button>
    </div>
    `
    addToyForm.reset()
  };

  //add functionality to likes button and delete button
  toyCollectionDiv.addEventListener('click', function(event){
    if(event.target.className === 'like-btn'){
      let likes = parseInt(event.target.previousElementSibling.innerText)
      let newLikes = likes + 1
      event.target.previousElementSibling.innerText = newLikes + " Likes"
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify ({
          likes: newLikes
        })
      })
    }
    if(event.target.className === 'delete-btn'){
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "DELETE"
      })
      event.target.parentElement.remove()
    }
  })

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });



//*this is the DOMContentLoaded end  
});
