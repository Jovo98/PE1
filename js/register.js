const form = {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
};
const button = document.querySelector("#button");
button.addEventListener("click", makeRegisterRequest);

function makeRegisterRequest() {
    if (!form.username.value || !form.email.value || !form.password.value) {
        alert("Please fill in all fields");
        return;
    }

    fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            name: form.username.value,
            email: form.email.value,
            password: form.password.value,
        }),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message);
                });
            }
            return response.json();
        })
        .then(results => {
            console.log(results);
            alert("Registration successful!");
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        });
}


