let addToy = false;
let toyCollection = document.querySelector("#toy-collection");
let addToyForm = document.querySelector(".add-toy-form");


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch(`http://localhost:3000/toys`)
.then(res => res.json())
.then(toyArr => {
  toyArr.forEach(function(toyObj){
   turnToyToHTML(toyObj)
  })
})


addToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify({
      "name": evt.target.name.value,
      "image": evt.target.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((newlyCreatedToy) => {
      turnToyToHTML(newlyCreatedToy)
  })
})



function turnToyToHTML(toyPOJO){
  let toyCard = document.createElement("div")
  toyCard.className = "card"

  let toyName = document.createElement("h2")
  toyName.innerText = toyPOJO.name

  let toyPic = document.createElement("img")
  toyPic.className = "toy-avatar"
  toyPic.src = toyPOJO.image

  let likes = document.createElement("p")
  likes.innerText = `${toyPOJO.likes} Likes`

  let likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.innerText = "Like"
  likeButton.setAttribute = toyPOJO.id

  toyCard.append(toyName, toyPic, likes, likeButton)

  toyCollection.append(toyCard)

  likeButton.addEventListener("click",(e)=> {
    fetch(`http://localhost:3000/toys/${toyPOJO.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toyPOJO.likes + 1

    })
  })
  .then(res => res.json())
  .then((updatedLike) => {
    likes.innerText = `${updatedLike.likes} Likes`
    toyPOJO.likes = updatedLike.likes
 })
})
}