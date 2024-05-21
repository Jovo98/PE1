function deletePost(id) {
    const deleteUrl = `https://v2.api.noroff.dev/blog/posts/jo_tan_vo/${id}`;

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
            return response.json();
        })
        .then((result) => {
            console.log(result);
            alert("Post deleted successfully!");
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            alert("There was a problem with your request: " + error.message);
        });
}
