function upChapter(storyId) {
    const jwttoken = localStorage.getItem("jwttoken")
    const sname = document.getElementById("title").value;
    let content = document.getElementById("description").value;
    let form = document.querySelector("form");
    const API_URL = 'http://localhost:80/api/v1/story/up-chapter';
    content = content.replace(/\n/g, '<br>'); // replace new line with <br>
    content = content.replace(/\t/g, '&emsp;'); // replace tab with &emsp;
    const payload = {
        id: null,
        storyId: storyId,
        title: sname,
        content: content,
    };

    // make the API call here with the name, description, and type values
    // ...
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + jwttoken,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(alert("Thêm thành công"))
        .then(function(){
            window.location.href = './truyen_da_dang.html'
        })
        .catch(error => console.error(error));
}