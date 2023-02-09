async function CapNhatTen(username) {
    const userId = localStorage.getItem('userId')
    const jwttoken = localStorage.getItem('jwttoken')
    const apiURL = 'http://localhost:80/api/v1/user/name'
    await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + jwttoken,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ id: userId, name: username })
    })
        // .then(response => { return true })
        .catch(error => {
            console.error(error)
            return false
        });
}
async function CapNhatAnh(file) {
    const id = localStorage.getItem('userId')
    console.log(id)
    const apiURL = 'http://localhost:80/api/v1/user/avatar'
    const jwttoken = localStorage.getItem("jwttoken")
    var formData = new FormData();
    formData.append("userId", id);
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", apiURL, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + jwttoken);
    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText);
        }
    };
}
