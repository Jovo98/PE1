const form = {
    email: document.querySelector("#username"),
    password: document.querySelector("#password"),
}
const button = document.querySelector("#button")
    button.addEventListener("click", (e) => {
    e.preventDefault();
        if (!form.email.value || !form.password.value) {
            alert("Please enter both username and password");
            return;
        }
    const login = "https://v2.api.noroff.dev/auth/login";

    fetch(login, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                // Handle different status codes
                if (response.status === 400) {
                    throw new Error('Invalid credentials');
                } else if(response.status === 401) {
                    throw new Error('Invalid credentials')
                }
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.error) {
                alert("Error Password or Username");
            } else {
                if (data.data.accessToken) {
                    localStorage.setItem('accessToken', data.data.accessToken);
                    window.location.href = "register.html";
                } else {
                    console.error("no data")
                }
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
            alert("There was a problem with your login request: " + err.message);
        });
    });
