function changePassword() {
    const id = localStorage.getItem('userId')
    const jwttoken = localStorage.getItem('jwttoken')
    const form = document.getElementById('dmkForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const oldPass = document.getElementById('inputOldPass').value;
        const newPass = document.getElementById('inputNewPass').value;
        const repeat = document.getElementById('inputRepeat').value;

        console.log(oldPass, newPass, repeat)

        fetch('http://localhost:80/api/v1/user/password', {
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
                userId: id,
                oldPass: oldPass,
                newPass: newPass,
                repeat: repeat,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.data.id != null){
                alert('Đổi mật khẩu thành công')
                window.location.href = './qltk.html'
            }
            else{
                alert('Đăng ký thất bại')
            }
                
        })
        .catch(error => console.error(error))
    })
}