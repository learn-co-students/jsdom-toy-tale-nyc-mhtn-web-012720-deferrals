let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyDiv = document.querySelector('#toy-collection')
  const newToyForm = document.querySelector('.add-toy-form')

  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })
  .then(function(toysArray){
    renderToys(toysArray)
  })

  const renderToys = (toysArray) => {
    toysArray.forEach(toy => {
      toyDiv.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
        <button data-id=${toy.id} class="delete-btn">Delete</button>
      </div>
      `
    })
  };

  newToyForm.addEventListener('submit', function(event){
    event.preventDefault()
    let toyName = event.target.name.value
    let toyImage = event.target.image.value
    //* have input values */
    //* need to slap them on the dom */
    fetch('http://localhost:3000/toys', {
      method: 'POST',
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
    .then(function(response){
      return response.json()
    })
    .then(function(newToy){
      let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id=${newToy.id} class="like-btn">Like <3</button>
        <button data-id=${newToy.id} class="delete-btn">Delete</button>
      </div>
      `
      toyDiv.innerHTML += newToyHTML
    })
  });

  toyDiv.addEventListener('click', function(event){
    if(event.target.className === 'like-btn'){
      let likes = parseInt(event.target.previousElementSibling.innerHTML)
      let newLikes = likes + 1
      event.target.previousElementSibling.innerHTML = newLikes + ' Likes'
  
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }
    if (event.target.className === 'delete-btn'){
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`,{
        method: 'DELETE'
      })
      event.target.parentElement.remove() 
    }
  });

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
