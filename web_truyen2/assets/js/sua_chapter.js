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
    const apiURL = 'http://localhost:80/api/v1/story/up-chapter'
    const jwttoken = localStorage.getItem('jwttoken')
    const title = document.getElementById('title').value
    const content = document.getElementById('description').innerHTML
    console.log('title:', title)
    console.log('content:' , content)
    return
    fetch(apiURL,{
        method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + jwttoken,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                userId: chapterId,
                storyId: storyId,
                newPass: newPass,
                repeat: repeat,
            })
    })
}