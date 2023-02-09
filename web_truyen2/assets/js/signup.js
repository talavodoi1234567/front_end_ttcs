function signUp() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const url = 'http://localhost:80/register';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const id = data.id;
        if (id == null){
            alert("Đăng ký thất bại");
        }
        else{
            alert("Đăng ký thành công");
            open("./login.html");
        }
    })
    .catch(error => console.log(error));

}