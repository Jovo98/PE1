
const apiUrl = "https://v2.api.noroff.dev/blog/posts/jo_tan_vo"
// Function to make a POST request
function makePostRequest() {
    fetch("https://v2.api.noroff.dev/blog/posts/jo_tan_vo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":
            "Bearer INSERTTOKENHERE",
        },
        body: JSON.stringify({
            title: "JS is not amazing at all",
            body: "Because its old af",
            tags: ["Dev No so Quality of Life"],
        }),
    })
        .then((response) => response.json())
        .then((result) => console.log(result))
}
function makeRegisterRequest(){
    const response = fetch("https://v2.api.noroff.dev/auth/register", {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            "name": "jo_tan_vo",
            "email": "jotanv00100@stud.noroff.no",
            "password": "joerher123456",
        })
    })
    console.log(response)
    const results = response.json()
    console.log(results)
}

function makeLoginRequest() {
    fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "jotanv00100@stud.noroff.no",
            password: "joerher123456",
        }),
    })
        .then((response) => response.json())
        .then((result) => console.log(result));
}

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const blogsContainer = document.getElementById('blogs');
        if (data && data.data && data.data.length > 0) {
            data.data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <p>Post ID: ${post.id}</p>
                    <p>Author: ${post.author.name}</p>
                    <hr>
                `;
                blogsContainer.appendChild(postElement);
            });
        } else {
            blogsContainer.innerHTML = "<p>No blog posts found.</p>";
        }
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
    });



