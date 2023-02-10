function fillCurrentChapter(chapterId) {
    const apiURL = 'http://localhost:80/api/v1/chapter/v2/id?chapterId=' + chapterId
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const title = data.data.chapter.title
            let content = data.data.chapter.content
            content = content.replace(/<br>/g, '\n'); // replace <br> with new line
            content = content.replace(/&emsp;/g, '\t'); // replace &emsp; with tab
            document.getElementById('title').value = title
            document.getElementById('description').innerHTML = content
        })
}
function suaChapter(chapterId, storyId){
    const jwttoken = localStorage.getItem("jwttoken")
    const sname = document.getElementById("title").value;
    let content = document.getElementById("description").value;
    const API_URL = 'http://localhost:80/api/v1/story/up-chapter';
    content = content.replace(/\n/g, '<br>'); // replace new line with <br>
    content = content.replace(/\t/g, '&emsp;'); // replace tab with &emsp;
    const payload = {
        id: chapterId,
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
        .then(alert("Sửa thành công"))
        .then(function(){
            window.location.href = './truyen_da_dang.html'
        })
        .catch(error => console.error(error));
}