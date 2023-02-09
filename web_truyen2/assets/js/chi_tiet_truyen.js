const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("id"));
async function getInfoTruyen(id){
    let returnValue = null
    const apiURL = 'http://localhost:80/api/v1/story/v2/id?storyId=' + id
    await fetch(apiURL)
    .then(response => response.json())
    .then(data =>{
        returnValue = data.data
    })
    .catch(error => console.error(error))
    return returnValue
}
async function getTL(id){
    let tl = []
    const data = await getInfoTruyen(id)
    data.story.listKinds.forEach(element => {
        tl.push(element.kind)
    });
    return tl;
}
async function fillData(id){
    const data = await getInfoTruyen(id)
    document.getElementById('NameInBreadCrumb').innerHTML =  data.story.name
    document.getElementById('NameInIntro').innerHTML = data.story.name
    document.getElementById('picture').src = 'http://localhost:80/' + data.story.avatar.path
    document.getElementById('author').innerHTML = data.authorName
    document.getElementById('GT').innerHTML = data.story.content
    let dsc = ``
    const beginning = data.chapterByStoryDTOList[0]
    const lstChapter = data.chapterByStoryDTOList.reverse()
    lstChapter.forEach(element => {     
        dsc += `
        <a href="./doc_truyen.html?chapterId=` + element.id +`" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">`+ element.title +`</h5>
            <small>`+ element.createDate + `</small>
        </div>
    </a>
        `
    })
    document.getElementById('listChapter').innerHTML = dsc
    let tl = ``
    const lstTL = await getTL(id)
    console.log(lstTL)
    lstTL.forEach(element =>{
        tl += `
        <a href="./index.html?types=` + element.id +`" class="btn btn-outline-warning btn-lg">` + element.name +`
        </a>    
        `
    })
    document.getElementById('Kinds').innerHTML = tl
    document.getElementById('readFromBeginning').href = './doc_truyen.html?chapterId=' + beginning.id

}