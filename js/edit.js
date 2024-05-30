const form = {
    title: document.querySelector("#title"),
    body: document.querySelector("#body"),
    tags: document.querySelector("#tags"),
    deleteID: document.querySelector("#deleteID"),
    postID: document.querySelector("#postID"),
    image: document.querySelector("#image"),
    imageAlt: document.querySelector("#alt")
};
const accessToken = localStorage.getItem('accessToken');

function deletePost(event) {
    event.preventDefault();

    const deleteIdValue = form.deleteID.value.trim();
    if (!deleteIdValue) {
        alert("Please enter a valid Post ID");
        return;
    }
    const deleteUrl = `https://v2.api.noroff.dev/blog/posts/jo_tan_vo/${deleteIdValue}`;
    fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
        })
        .then(() => {
            alert("Post deleted successfully!");
        })
}

const button = document.querySelector('#button');
const button2 = document.querySelector('#button2')
button.addEventListener("click", deletePost);

function editPutRequest() {
    const postIdValue = form.postID.value.trim();
    if (!postIdValue) {
        alert("Please enter a valid Post ID");
        return;
    }

    if (!form.title.value) {
        alert("The post requires a title!");
        return;
    }
    const postBody = {
        title: form.title.value,
        body: form.body.value,
        tags: [form.tags.value]
    };
    if (form.image.value) {
        postBody.media = {
            url: form.image.value,
            alt: form.imageAlt.value
        };
    }
    const putUrl = `https://v2.api.noroff.dev/blog/posts/jo_tan_vo/${postIdValue}`;

    fetch(putUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postBody),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
            alert("Successfully edited post!");
        })
}
button2.addEventListener("click", (e) => {
    e.preventDefault()
    editPutRequest();
});



