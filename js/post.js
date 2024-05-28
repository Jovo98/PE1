const params = new URLSearchParams(window.location.search);
const postId = params.get('postId');
const apiUrl = `https://v2.api.noroff.dev/blog/posts/jo_tan_vo`;



fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data && data.data) {
            const post = data.data.find(p => p.id === postId);
            if (post) {
                const postContainer = document.getElementById('post');
                postContainer.innerHTML = `
                    <h1>${post.title}</h1>
                    <p>${post.body}</p>
                    <p>Author: ${post.author.name}</p>
                    ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Image'}">` : ''}
                    <p>Post ID: ${post.id}</p>
                `;
            } else {
                document.getElementById('post').innerHTML = '<p>Post not found.</p>';
            }
        }
    })
    .catch(error => {
        console.error('Error fetching blog post:', error);
        document.getElementById('post').innerHTML = '<p>There was an error fetching the post.</p>';
    });

document.getElementById("Home").addEventListener("click", () => {
    history.back();
});