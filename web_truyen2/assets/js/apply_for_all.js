// function createURL(pages, types, search){
//   let url = './index.html?pages=' + pages
//   if (types === 0)
//   url += '&search=' + search
//   return url
// }
function checkLogIn() {
  const userId = localStorage.getItem("userId")
  const jwttoken = localStorage.getItem("jwttoken")
  if (userId && jwttoken) {
    return true
  }
  return false
}
async function getTL() {
  let types = []
  await fetch('http://localhost:80/api/v1/kind')
    .then(response => response.json())
    .then(data => {
      data.data.forEach(element => {
        types.push(element)
      });
    })
  return types
}
async function fillTLtoList() {
  let listTL = await getTL()
  const list = document.createElement('ul');
  list.classList.add('dropdown-menu');
  listTL.forEach(element => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.id = 'type' + element.id;
    link.href = './index.html?types=' + element.id
    link.classList.add('dropdown-item');
    link.textContent = element.name;
    li.appendChild(link)
    list.appendChild(li);
  })
  const writeTL = document.getElementById("dropdownType");
  writeTL.appendChild(list);
}
async function showLogIn() {
  const filter = document.getElementById('isLogIn')
  if (!filter) {
    console.log('assd')
    return
  }
  if (!checkLogIn()) {
    filter.innerHTML = `
    <a class="login-signup" href="./login.html" id="loginPressed">Đăng nhập</a>
    |
    <a class="login-signup" href="./signup.html" id="signUpPressed">Đăng ký</a>
    `
  } else {
    const userId = localStorage.getItem("userId")
    const jwttoken = localStorage.getItem("jwttoken")
    filter.innerHTML = `
    <div class="dropdown">
      <a class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="" alt="Ảnh đại diện" class="avatar" id="avatar">
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="./qltk.html">
          <i class="fa-solid fa-user"></i>
              Trang cá nhân</a></li>
        <li><a class="dropdown-item" href="./truyen_da_dang.html">
                <i class="fa-solid fa-upload"></i>
                Truyện đã đăng</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><button onclick="logOut()" class="dropdown-item" href="./index.html">
                <i class="fa-solid fa-right-from-bracket"></i>
                Đăng xuất
            </button>
        </li>
      </ul>
    </div>
    `
    await getAvatar(userId, jwttoken)
  }
}
async function getAvatar(id, token) {
  if (checkLogIn()) {
    const whereToFil = document.getElementById('avatar')
    const apiURL = 'http://localhost:80/api/v1/user/personal?userId=' + id
    await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Cache-Control": "no-cache",
      }
    })
      .then(response => response.json())
      .then(data => document.getElementById('avatar').src = 'http://localhost:80/' + data.data.avatar.path)
      .catch(error => console.error())
  }
  else return
}
fillTLtoList()
function logOut(){
  localStorage.clear()
  window.location.href= './index.html'
}
function searchForm(){
  const form = document.getElementById('searchForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault()
  const search = document.getElementById('searchValue').value;
  console.log(search)
  window.location.href = './index.html?search=' + search
  })
}

