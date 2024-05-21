const form = {
    title: document.querySelector("#title"),
    body: document.querySelector("#body"),
    tags: document.querySelector("#tags"),
    postID: document.querySelector("#postID"),
    image: document.querySelector("#image"),
    imageAlt: document.querySelector("#alt")
};

const button = document.querySelector("#button");
const accessToken = localStorage.getItem('accessToken');

function makePostRequest() {
    // Validation checks
    if (!form.title.value) {
        alert("The post requires a title!");
        return;
    }

    fetch("https://v2.api.noroff.dev/blog/posts/jo_tan_vo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            title: form.title.value,
            body: form.body.value,
            tags: [form.tags.value],
            media: {
                url: form.image.value,
                alt: form.imageAlt.value
            }
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
            alert("Successfully created new post!");
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            alert("accessToken not valid, please log in");
        });
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    makePostRequest();
});




