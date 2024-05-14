const form = {
    title: document.querySelector("#title"),
    body: document.querySelector("#body"),
    tags: document.querySelector("#tags"),
};

const button = document.querySelector("#button");
const accessToken = localStorage.getItem('accessToken');

function makePostRequest() {
    // Validation checks
    if (!form.title.value || !form.body.value || !form.tags.value) {
        alert("Please fill in all fields");
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
            alert("There was a problem with your request: " + error.message);
        });
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    makePostRequest();
});