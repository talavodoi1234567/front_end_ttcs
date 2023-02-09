async function fillChapterData(storyId){
    const apiURL = 'http://localhost:80/api/v1/story/v2/id?storyId=' + storyId
    let fillData = `
    <thead>
        <tr>
        <th scope="col">Chap</th>
        <th scope="col">Tên chap</th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody id="chapterList">
    `
    await fetch(apiURL)
    .then(response => response.json())
    .then(data =>{
        data.data.chapterByStoryDTOList.forEach(element => {
            fillData += `
            <tr>
                <th scope="row">` + element.chap +`</th>
                <th>` + element.title + `</th>
                <th><a href="./sua_chapter.html?chapterId=` + element.id +`&storyId=`+ storyId + `">Sửa chapter</a></th>
            </tr>
            `
        })
    })
    fillData += `
    </tbody>
    `
    document.getElementById('listChapter').innerHTML = fillData
}