async function getInfoTruyen(id){
    let fullData = {}
    const apiURL = 'http://localhost:80/api/v1/story/v2/id?storyId=' + id
    try {
        const response = await fetch(apiURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }) 
        fullData = await response.json()
    } catch (error) {
        console.error(error)
    }
    return fullData
}
async function getInfoChap(id){
    let fullData = {}
    const apiURL = 'http://localhost:80/api/v1/chapter/v2/id?chapterId=' + id
    try {
        const response = await fetch(apiURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        fullData = await response.json()
    } catch (error) {
        console.error(error)
    }
    return fullData
}
async function fillData(chapterId){
    const chapterData = await getInfoChap(chapterId)
    const storyId = chapterData.data.chapter.storyId
    const storyData = await getInfoTruyen(storyId)
    console.log(storyData)
    const data = storyData.data.chapterByStoryDTOList
    let fData = ``
    data.forEach(element => {
        const idChap = element.id
        const noChap = element.chap
        const chapTitle = element.title
        const title = `Chapter ` + noChap + `: ` + chapTitle
        fData += `
            <li><a class="dropdown-item" href="./doc_truyen.html?chapterId=` + idChap + `" onClick="">` + title + `</a>
        `
    });
    document.getElementById("listChapter").innerHTML = fData
    document.getElementById("listChapter2").innerHTML = fData

    const storyName = storyData.data.story.name
    document.getElementById('StoryName').innerHTML = storyName
    document.getElementById('StoryName2').innerHTML = storyName
    document.getElementById('StoryName2').href = './chi_tiet_truyen.html?id=' + storyId

    const chapterName = chapterData.data.chapter.title
    document.getElementById('ChapterName').innerHTML = chapterName
    document.getElementById('ChapterName2').innerHTML = chapterName

    const authorName = storyData.data.authorName
    const dayCreated = chapterData.data.chapter.createdDate

    document.getElementById('author').innerHTML = 'Người đăng: ' + authorName
    document.getElementById('Day').innerHTML = dayCreated

    const before = document.getElementById('before')
    const before2 = document.getElementById('before2')
    const after = document.getElementById('after')
    const after2 = document.getElementById('after2')

    const prevChapData = chapterData.data.prevChapterId
    const nextChapData = chapterData.data.nextChapterId

    const noChap = chapterData.data.chapter.chap
    const maxChap = chapterData.data.maxChap
    if (noChap == 1){
        before.classList.add('disabled')
        before2.classList.add('disabled')
    }
    if (noChap == maxChap){
        after.classList.add('disabled')
        after2.classList.add('disabled')
    }
    document.getElementById('content').innerHTML = chapterData.data.chapter.content
}
async function getPreviousChap(chapterId){
    const data = await getInfoChap(chapterId)
    return data.data.prevChapterId
}
async function getNextChap(chapterId){
    const data = await getInfoChap(chapterId)
    return data.data.nextChapterId
}
async function gotoPreviousChap(chapterId){
    window.location.href = './doc_truyen.html?chapterId=' + await getPreviousChap(chapterId)
}
async function gotoNextChap(chapterId){
    window.location.href = './doc_truyen.html?chapterId=' + await getNextChap(chapterId)
}