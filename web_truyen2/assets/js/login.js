function saveDataToLocalStorage(id, token){
    localStorage.setItem('userId', id);
    localStorage.setItem('jwttoken', token);
};
function LogIn() {
    const email = document.getElementById("exampleDropdownFormEmail1").value
    const password = document.getElementById("exampleDropdownFormPassword1").value
    //how to convert string to json in javascript?
    const url = 'http://localhost:80/authenticate';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      const { userId, jwttoken } = data;
      saveDataToLocalStorage(userId, jwttoken);
      if (userId && jwttoken){
        window.location.href = "./index.html"
      }
      else{
        alert("Tài khoản hoặc mật khẩu không đúng")
      }
    })
    .catch(error => console.log(error));

}
document.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    LogIn()
  }
});

