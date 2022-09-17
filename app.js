const url = "https://jsonplaceholder.typicode.com/posts?_limit=20"
const myPosts = []

// GET
// Gets All the posts
async function getAllPosts() {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error("Problem with fetching posts.")
  } catch (error) {
    console.log(error)
  }
}

getAllPosts()
  .then(res => { showAllPosts(res) })


// Shfaq 20 poste te serverit dhe shfaq postet e krijuara nga useri nese ka te tille.
const showAllPosts = (allPosts) => {
  let posts = document.getElementById("posts")
  if (allPosts.length > 0) {
    for (const post of allPosts) {
      const div = document.createElement("div");
      const pTitle = document.createElement("p")
      const idSpan = document.createElement('span')
      idSpan.innerText = "Id: " + post.id;
      div.appendChild(idSpan)
      pTitle.innerText = post.title
      pTitle.id = "title"
      const pBody = document.createElement("p")
      pBody.innerText = post.body;
      pBody.id = "body"
      div.appendChild(pTitle)
      div.appendChild(pBody)
      const updateButt = document.createElement("button")
      updateButt.id = "up" + post.id
      updateButt.classList.add("btn", "btn-success")
      updateButt.innerText = "Update"
      updateButt.addEventListener('click', showUpdatePopup)
      const hr = document.createElement("hr")
      posts.appendChild(div)
      posts.appendChild(updateButt)
      posts.appendChild(hr)
    }
  }
  if (myPosts.length > 0) {
    for (const post of myPosts) {
      const div = document.createElement("div");
      const pTitle = document.createElement("p")
      const idSpan = document.createElement('span')
      idSpan.innerText = "Id: " + post.id;
      div.appendChild(idSpan)
      pTitle.innerText = post.title
      pTitle.id = "title"
      const pBody = document.createElement("p")
      pBody.innerText = post.body;
      pBody.id = "body"
      div.appendChild(pTitle)
      div.appendChild(pBody)
      const updateButt = document.createElement("button")
      updateButt.id = "up" + post.id
      updateButt.classList.add("btn", "btn-success")
      updateButt.innerText = "Update"
      updateButt.addEventListener('click', showUpdatePopup)
      const hr = document.createElement("hr")
      posts.appendChild(div)
      posts.appendChild(updateButt)
      posts.appendChild(hr)
    }
  }
}

// Fshin te gjitha postet nga div-i.
const clearAllPosts = () => {
  let posts = document.getElementById("posts")
  posts.innerHTML = "<hr>"
}


// GET
// Merr nje post te caktuar ne baze te ID-se
async function getPostById(id) {
  let tmpUrl = `https://jsonplaceholder.typicode.com/posts/${id}`
  try {
    const response = await fetch(tmpUrl)
    if (response.ok) {
      const jsonResponse = response.json()
      return jsonResponse
    }
    throw new Error("Id-ja duhet te jete ne mes 1-100.")
  } catch (error) {
    console.log(error)
  }
}

// Merr ID-n e shkruar nga useri ne input dhe shfaq postin me ate ID
const searchPost = (event) => {
  event.preventDefault();
  let userInput = document.getElementById("searchInput");
  let id = userInput.value
  getPostById(id)
    .then(res => showPopup(res))
}
document.getElementById('search').addEventListener("click", searchPost)

// Shfaq Popup qe ka postin e kerkuar nga useri ne baze te ID-se.
const showPopup = (res = null) => {
  if (res != null) {
    showPostPopup.style.display = "flex";
    container.style.display = "none";
    popupTitle.innerText = res.title;
    popupBody.innerText = res.body;
  } else {
    alert("Posti qe kerkoni nuk ekziston.");
  }
}

// Mbyll Popup-s 
const hidePopup = (event) => {
  event.preventDefault();
  showPostPopup.style.display = "none";
  createPostPopup.style.display = "none"
  updatePostPopup.style.display = "none"
  container.style.display = "";
}

// Te gjitha button-at qe mbyllin Popup-s e kane klasen .closePopup
// Tek te gjithe eventi click mbyll Popup-s
const closePopups = document.querySelectorAll(".closePopup")
for (let i = 0; i < closePopups.length; i++) {
  closePopups[i].addEventListener('click', hidePopup)
}

// POST
// Krijon nje post te ri me metoden POST
const createPost = async function (event) {
  event.preventDefault()
  let tmpUrl = "https://jsonplaceholder.typicode.com/posts"
  try {
    if (createTitle.value && createBody.value) {
      await fetch(tmpUrl, {
        method: 'POST',
        body: JSON.stringify({
          title: createTitle.value,
          body: createBody.value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => myPosts.push(json));
      showAllPosts([])
      hidePopup(event)
    } else {
      alert("Duhet te jepni nje titull dhe body!");
    }
  } catch (error) {
    console.log(error);
  }
}
createButton.addEventListener('click', createPost)


const showCreatePopup = (event) => {
  event.preventDefault();
  createPostPopup.style.display = "flex"
  updatePostPopup.style.display = "none"
  container.style.display = "none";
}
create.addEventListener('click', showCreatePopup)


// PUT
// Me ane te metodes PUT ben update post-in, 
const updatePost = async function (event) {
  event.preventDefault()
  let postId = updateButton.id
  let tmpUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`
  try {
    if (updateTitle.value && updateBody.value) {
      fetch(tmpUrl, {
        method: 'PUT',
        body: JSON.stringify({
          id: postId,
          title: updateTitle.value,
          body: updateBody.value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log("Updated, here is the updated post: ", json));
      hidePopup(event)
    } else {
      alert("Duhet te jepni nje titull dhe body!");
    }
  } catch (error) {
    console.log(error);
  }
}

const updateButton = document.querySelector(".updateButton")
updateButton.addEventListener('click', updatePost)


// Thirret kur krijohet buttoni, pasi te klikohet (rreshti 44 dhe 69)
const showUpdatePopup = (event) => {
  event.preventDefault();
  let id = event.currentTarget.id.slice(2)
  updatePostPopup.style.display = "flex"
  updateButton.id = id
  if (updateTitle.value && updateBody.value) {
    getPostById(id)
      .then(res => {
        updateTitle.value = res.title
        updateBody.value = res.body
      })
  }
  createPostPopup.style.display = "none"
  container.style.display = "none";
}

