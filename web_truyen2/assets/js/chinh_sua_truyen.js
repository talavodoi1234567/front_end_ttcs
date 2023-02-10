async function getCurrentData(storyId) {
    const apiURL = 'http://localhost:80/api/v1/story/v2/id?storyId=' + storyId
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const storyName = data.data.story.name
            let content = data.data.story.content
            content = content.replace(/<br>/g, '\n'); // replace <br> with new line
            content = content.replace(/&emsp;/g, '\t'); // replace &emsp; with tab
            const image = data.data.story.avatar.path
            document.getElementById('storyImage').src = 'http://localhost:80/' + image
            document.getElementById('title').value = storyName
            document.getElementById('description').value = content
            let kindChecked = []
            data.data.story.listKinds.forEach(element => {
                kindChecked.push(element.kind.name)
            })
            getCheckBoxChecked(kindChecked)
        })
        .catch(error => console.error(error))
}
function getCheckBoxChecked(listKind) {
    console.log('ListKind: ', listKind)
    const apiUrl = 'http://localhost:80/api/v1/kind'
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('checkboxContainer');
            const table = document.createElement('table');
            const tbody = document.createElement('tbody');

            let row = null;
            let cell = null;
            let count = 0;

            data.data.forEach(item => {
                if (count % 3 === 0) {
                    row = document.createElement('tr');
                    tbody.appendChild(row);
                }

                cell = document.createElement('td');
                const list = document.createElement('input');
                list.type = 'checkbox';
                list.name = 'category';
                list.value = item.name;
                if (listKind.includes(item.name)) {
                    list.checked = true;
                }
                const label = document.createElement('label');
                label.for = item.name;
                label.textContent = item.name;
                cell.appendChild(list);
                cell.appendChild(label);
                row.appendChild(cell);
                count++;
            })

            table.appendChild(tbody);
            container.appendChild(table);
        })
}
async function getForm(storyId) {
    const userId = localStorage.getItem('userId')
    const jwttoken = localStorage.getItem('jwttoken')
    const sname = document.getElementById("title").value;
    let content = document.getElementById("description").value;
    content = content.replace(/\n/g, '<br>'); // replace new line with <br>
    content = content.replace(/\t/g, '&emsp;'); // replace tab with &emsp;
    let listKind = [];
    let form = document.getElementById('createStoryForm');
    let checkboxes = form.querySelectorAll("input[type='checkbox'][name='category']");
    // Loop through the checkboxes and retrieve the selected ones
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let id = i + 1; // The id is the counting number
            let name = checkboxes[i].value;
            listKind.push({ id, name });
        }
    }
    const API_URL = 'http://localhost:80/api/v1/story';

    const payload = {
        id: storyId,
        authorId: userId,
        name: sname,
        content: content,
        listKind: listKind
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
        .then(window.location.href = './truyen_da_dang.html')
        .catch(error => console.error());
}
async function suaAnh(storyId, file) {
    const id = localStorage.getItem('userId')
    console.log(id)
    const apiURL = 'http://localhost:80/api/v1/story/avatar?storyId=' + storyId
    const jwttoken = localStorage.getItem("jwttoken")
    var formData = new FormData();
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