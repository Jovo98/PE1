const apiUrl = "https://v2.api.noroff.dev/blog/posts/jo_tan_vo"
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
    .then(response => response.json())
    .then(data => {
        const blogsContainer = document.getElementById('blogs');
        const carouselContainer = document.getElementById('carousel');

        if (data && data.data && data.data.length > 0) {
            const latestPosts = data.data.slice(0, 3);
            latestPosts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.className = 'carouselItem';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <p>Author: ${post.author.name}</p>
                    <p>Post ID: ${post.id}</p>
                    ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Image'}" style="display:block; width:100%; max-width:300px;" >` : ''}
                    <button class="readMore">Read More</button>
                `;
                postElement.querySelector('.readMore').addEventListener('click', () => {
                    window.location.href = `post.html?postId=${post.id}`;
                });
                carouselContainer.appendChild(postElement);
            });

            const latest12Posts = data.data.slice(0, 12);
            latest12Posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'thumbnail';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Image'}">` : ''}
                    <p>Author: ${post.author.name}</p>
                    <p>Post ID: ${post.id}</p>
                    <button class="readMore">Read More</button>
                `;
                postElement.querySelector('.readMore').addEventListener('click', () => {
                    window.location.href = `post.html?postId=${post.id}`;
                });
                blogsContainer.appendChild(postElement);
            });

            let currentIndex = 0;
            const items = document.querySelectorAll('.carouselItem');
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

            showItem(currentIndex);
        }
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
    });
