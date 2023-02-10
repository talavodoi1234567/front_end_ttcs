const userId = localStorage.getItem('userId')
const jwttoken = localStorage.getItem('jwttoken')
console.log(userId, jwttoken)
function getCheckBox() {
    const apiUrl = 'http://localhost:80/api/v1/kind';
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
async function getForm() {
    const userId = localStorage.getItem('userId')
    const jwttoken = localStorage.getItem('jwttoken')
    if (!document.getElementById("term").checked) {
        alert("Please agree to the terms and conditions");
        return;
    }
    else {
        const sname = document.getElementById("title").value;
        let content = document.getElementById("description").value;
        content = content.replace(/\n/g, '<br>'); // replace new line with <br>
        content = content.replace(/\t/g, '&emsp;'); // replace tab with &emsp;
        let listKind = [];
        let returnStoryId = 0
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
            id: null,
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
            .then(alert("Thêm thành công"))
            .then(window.location.href = './truyen_da_dang.html')
            .catch(error => console.error())
    }
}
