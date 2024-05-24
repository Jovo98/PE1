const apiURL = "https://v2.api.noroff.dev/blog/posts/jo_tan_vo"
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

fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const blogsContainer = document.getElementById('blogs');
        const carouselContainer = document.getElementById('carousel');

        if (data && data.data && data.data.length > 0) {
            // Display the carousel for the 3 latest posts
            const latestPosts = data.data.slice(0, 3);
            latestPosts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.className = 'carousel-item';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <p>Post ID: ${post.id}</p>
                    <p>Author: ${post.author.name}</p>
                    ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Image'}" style="display:block; width:100%; max-width:300px;" >` : ''}
                    <a href="/blog/${post.id}">Read more</a>
                `;
                carouselContainer.appendChild(postElement);
            });

            // Display the 12 latest posts in a thumbnail grid
            const latest12Posts = data.data.slice(0, 12);
            latest12Posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'thumbnail';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Image'}">` : ''}
                    <p>Author: ${post.author.name}</p>
                    <a href="/blog/${post.id}">Read more</a>
                `;
                blogsContainer.appendChild(postElement);
            });

            // Carousel functionality
            let currentIndex = 0;
            const items = document.querySelectorAll('.carousel-item');
            const totalItems = items.length;

            function showItem(index) {
                items.forEach((item, i) => {
                    item.style.transform = `translateX(-${index * 100}%)`;
                });
            }

            document.getElementById('next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalItems;
                showItem(currentIndex);
            });

            document.getElementById('prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                showItem(currentIndex);
            });

            showItem(currentIndex); // Initialize carousel
        } else {
            blogsContainer.innerHTML = "<p>No blog posts found.</p>";
        }
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
    });

