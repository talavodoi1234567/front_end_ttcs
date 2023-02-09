function fillData(){
    const userId = localStorage.getItem('userId')
    const jwttoken = localStorage.getItem('jwttoken')
    const apiURL = 'http://localhost:80/api/v1/user/personal?userId=' + userId
    fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwttoken,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Cache-Control": "no-cache",
        },
    })
    .then(response => response.json())
    .then(data =>{
        const name = data.data.name
        const email = data.data.email
        const password = data.data.password
        const avatar = data.data.avatar.path
        document.getElementById("InputName").value = name
        document.getElementById("InputEmail").value = email
        document.getElementById("inputPassword").value = password
        document.getElementById("picture").src = 'http://localhost:80/' + avatar
    })
}