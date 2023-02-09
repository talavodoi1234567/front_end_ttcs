async function getInfoTruyen(pages) {
    const userId = localStorage.getItem('userId')
    const jwttoken = localStorage.getItem('jwttoken')
    const apiURL = 'http://localhost:80/api/v1/story/personal?page=' + pages + '&userId=' + userId
    console.log(apiURL)
    console.log(userId, jwttoken)
    const Authorization = 'Bearer ' + jwttoken
    let infoTruyen
    await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': Authorization,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            infoTruyen = data.data
            console.log(infoTruyen)
        })
        .catch(error => console.error(error))
    return infoTruyen
}
async function fillData(pages) {
    const data = await getInfoTruyen(pages)
    if (!data.numberOfElements) {
        alert('Trang không có truyện nào')
    }
    else {
        let fillData = `<ul class="list-group">`
        data.content.forEach(item => {
            const name = item.story.name;
            const avatar = item.story.avatar.path;
            const content = item.story.content;
            const storyId = item.story.id;
            let kind = []
            item.story.listKinds.forEach(info => {
                kind.push(info.kind.name)
            })
            const listKinds = kind.join(', ')
            fillData += `
            <li class="list-group-item d-flex">
                <div>
                    <img src="http://localhost:80/` + avatar + `" alt="..." class="pic-posted">
                </div>
                <div>
                    <h1>
                        ` + name + `
                    </h1>
                    <p>
                        ` + content + `
                    </p>
                    <p>
                        Thể loại: ` + listKinds + `
                    </p>
                    <div class="btn-group">
                        <button onclick="TaoChapter(` + storyId + `)" class="btn btn-primary btn-lg option-button" title="Thêm chapter">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <button onclick="WebListChapter(` + storyId + `)" class="btn btn-info btn-lg option-button" title="Danh sách các chapter">
                            <i class="fa-solid fa-list"></i>
                        </button>
                        <button onclick="SuaTruyen(` + storyId + `)" class="btn btn-secondary btn-lg option-button" title="Sửa truyện">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </div>
            </li>
            `;
        })
        fillData += `</ul>`
        document.getElementById("showStory").innerHTML = fillData
        document.getElementById('pagination-part').innerHTML = createPaginationPart(pages, data.totalPages - 1)
    }
}
function createPaginationPart(currentPage, maxPage) {
    //currentPage <= maxPage
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
            <a class="page-link" href="./truyen_da_dang.html?pages=` + maxPage + `" id="maxPage">` + (parseInt(maxPage) + 1) + `</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="./truyen_da_dang.html?pages=` + (parseInt(currentPage) + 1) +`">Sau</a>
        </li>
        `
        }
    } else {
        strpreviousPage =  `
            <li class="page-item">
                <a class="page-link" href="./truyen_da_dang.html?pages=` + (parseInt(currentPage) - 1) +`">Trước</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="./truyen_da_dang.html?pages=0">1</a>
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
                <a class="page-link" href="./truyen_da_dang.html?pages=` + maxPage + `" id="maxPage">`+ (parseInt(maxPage) + 1) + `</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="./truyen_da_dang.html?pages=` + (parseInt(currentPage) + 1) +`">Sau</a>
            </li>
            `
        }
    }
    return strpreviousPage + strcurrentPage + strnextPage
}
function TaoChapter(storyId) {
    window.location.href = './tao_chapter.html?storyId=' + storyId
}
function WebListChapter(storyId) {
    window.location.href = './ds_cac_chapter.html?storyId=' + storyId
}
function SuaTruyen(storyId) {
    window.location.href = './chinh_sua_truyen.html?storyId=' + storyId
}