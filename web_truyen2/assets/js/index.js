let maxPagesReal = 0
async function getAllTruyen(pages) {
    let story = []
    await fetch('http://localhost:80/api/v1/story/v2/home?page=' + pages + '&size=8')
        .then(response => response.json())
        .then(data => {
            maxPagesReal = data.data.storyHomePageDTOPage.totalPages
            if (data.data.storyHomePageDTOPage.totalPages - 1 >= pages){
                data.data.storyHomePageDTOPage.content.forEach(element => {
                    story.push(element)
                });
            }
            else return 0
        })
        .catch(error => console.error(error))
    console.log(story)
    return story
}
async function getTruyenByTK(pages, search) {
    if (search != ''){
        let story = []
        await fetch('http://localhost:80/api/v1/story/v2/name?storyName='+ search + '&page=' + pages + '&size=8')
            .then(response => response.json())
            .then(data => {
                maxPagesReal = data.data.storyHomePageDTOPage.totalPages
                data.data.storyHomePageDTOPage.content.forEach(element => {
                    story.push(element)
                });
            })
            .catch(error => console.error(error))
        console.log(story)
        return story
    }else return getAllTruyen(pages)
}
async function getTruyenByTL(pages, types) {
    let story = []
    if (types > 0){
        await fetch('http://localhost:80/api/v1/story/v2/kind?kindId='+ types + '&page=' + pages +'&size=8')
            .then(response => response.json())
            .then(data => {
                maxPagesReal = data.data.storyHomePageDTOPage.totalPages
                data.data.storyHomePageDTOPage.content.forEach(element => {
                    story.push(element)
                });
            })
            .catch(error => console.error(error))
        console.log(story)
        return story
    }else return getAllTruyen(pages)
}
function createPaginationPart(currentPage, maxPage, types, search)
{
    //currentPage <= maxPage
    console.log(currentPage, maxPage)
    let URLpart = ''
    if (types === 0 && search === '') {
    } else if (types !== 0 && search === '') {
        URLpart = 'types=' + types
    } else if (types === 0 && search !== '') {
        URLpart = 'search=' + search
    }
    if (currentPage > maxPage) {
        return ''
    }
    let strpreviousPage = ``
    let strcurrentPage = `
    <li class="page-item">
        <a class="page-link disabled" href="#">`+ (parseInt(currentPage) + 1) + `</a>
    </li>
    `
    let strnextPage = ``
    if (currentPage == 0) {
        strpreviousPage = `
        <li class="page-item">
            <a class="page-link disabled" href="#">Trước</a>
        </li>
        `
        if (maxPage == 0) {
            strnextPage = `
            <li class="page-item">
                <a class="page-link disabled" href="#">Sau</a>
            </li>
            `
        }
        else {
            strnextPage = `
        <li class="page-item">
            <a class="page-link disabled" href="#">...</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="./index.html?pages=` + maxPage + `" id="maxPage">` + (parseInt(maxPage) + 1) + URLpart + `</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="./index.html?pages=` + (parseInt(currentPage) + 1) + URLpart + `">Sau</a>
        </li>
        `
        }
    } else {
        strpreviousPage =  `
            <li class="page-item">
                <a class="page-link" href="./index.html?pages=` + (parseInt(currentPage) - 1) + URLpart + `">Trước</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="./index.html?pages=0">1</a>
            </li>
            <li class="page-item">
                <a class="page-link disabled" href="#">...</a>
            </li>
        `
        if (currentPage == maxPage){
            strnextPage = `
                <li class="page-item">
                    <a class="page-link disabled" href="#">Sau</a>
                </li>
            `
        }else{
            strnextPage = `
            <li class="page-item">
                <a class="page-link disabled" href="#">...</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="./index.html?pages=` + maxPage + `" id="maxPage">`+ (parseInt(maxPage) + 1) + URLpart + `</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="./index.html?pages=` + (parseInt(currentPage) + 1) + URLpart +`">Sau</a>
            </li>
            `
        }
    }
    return strpreviousPage + strcurrentPage + strnextPage
}
async function fillTruyen(pages, types=0, search='') {
    let data = null
    console.log(types === 0 && search === '')
    if (types === 0 && search === '') {
        data = await getAllTruyen(pages);
    } else if (types !== 0 && search === '') {
        data = await getTruyenByTL(pages, types);
    } else if (types === 0 && search !== '') {
        data = await getTruyenByTK(pages, search);
    }
    const whereToFill = document.getElementById('allTruyen')
    const fillPagination = document.getElementById('pagination')
    let strFill = ``
    if (data == 0){
        strFill = `<h2>Xin lỗi, trang không tồn tại</h2>`
    }else{
        strFill = ``
        data.forEach(element => {
            strFill += `
                <div class="card col">
                <img src="http://localhost:80/` + element.path + `"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><a class="name-story" href="./chi_tiet_truyen.html?id=`+ element.storyId +`">` + element.storyName + `</a>
                    </h5>
                    <a href="#" class="card-text name-story">Chương `+ element.chap + `</a>
                    <small class="text-muted time">` + element.createdDate + `</small>
                </div>
            </div>
                `
        })
    }
    whereToFill.innerHTML = strFill
    fillPagination.innerHTML = createPaginationPart(pages, maxPagesReal - 1, types, search)
}
function getPages() {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('pages')) {
        return searchParams.get('pages');
    } else {
        return 0;
    }
}
function getTypes(){
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('types')) {
        return searchParams.get('types');
    } else {
        return 0;
    }
}
function getSearch(){
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('search')) {
        return searchParams.get('search');
    } else {
        return '';
    }
}