 
let refreshToken = () => {
    try {
        let token_refresh = JSON.parse(localStorage.getItem('refresh_token'));        
        if(token_refresh === null){
            window.location.href='login.html';
        } else {
            axios.post('https://hoodnewss.herokuapp.com/api/v1/token/refresh/',{
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                refresh: token_refresh,
            })
            .then((res) => {
                new_access_token = JSON.stringify(res.data.access);
                localStorage.setItem('access_token', new_access_token)
            })
        }
    }
    catch(err) {
        // console.log(err)
        // window.location.href='../registrationTemplates/login.html';
    }
}


let createPostsHandler = (e) => {
    refreshToken()
    access = JSON.parse(localStorage.getItem('access_token'));
    tosend = `Bearer ${access}`;

    let department = document.getElementById('postdepartment').value;
    let location = document.getElementById('location').value;
    let hood = document.getElementById('posthood');

    user_hood = localStorage.getItem('create_business.html');
    fetch('https://hoodnewss.herokuapp.com.com/api/v1/posts/' + user_hood + '/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'Authorization': tosend,
            },
            body: JSON.stringify({
                post_department:department,
                post_location:location,
                post_hood:post_hood
            })
        })
    .then((res) => {
        console.log(res)
        message.style.display = 'block'
        message.innerHTML = 'Department Successfully Saved!';
        form.reset()
        window.location.href='business_list.html';
    })
    .catch((err) => {
        console.log(err)
        form.reset()
        message.style.display = 'block'
        message.innerHTML = 'Please use another Department!';
    });
    e.preventDefault();
}

document.getElementById('postform').addEventListener('submit', createPostsHandler);