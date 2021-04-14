let addToy = false;
let toyCollection= document.querySelector("#toy-collection")

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

function turnToyToHTML(toyPOJO){
  let toyCard = document.createElement("div")
  toyCard.className = "card"

  let toyName = document.createElement("h2")
  toyName.innerText = toyPOJO.name

  let toyPic = document.createElement("img")
  toyPic.className = "toy-avatar"
  toyPic.src = toyPOJO.image

  let likes = document.createElement("p")
  likes.innerText = toyPOJO.likes

  let likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.innerText = "Like"
  likeButton.setAttribute = toyPOJO.id

  toyCard.append(toyName, toyPic, likes, likeButton)

  toyCollection.append(toyCard)


  

}