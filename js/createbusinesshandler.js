 
let refreshToken = () => {
    try {
        let token_refresh = JSON.parse(localStorage.getItem('refresh_token'));        
        if(token_refresh === null){
            window.location.href='login.html';
        } else {
            axios.post('https://hoodnewss.herokuapp.com.com/api/v1/token/refresh/',{
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
        
    }
}


let createPostsHandler = (e) => {
    refreshToken()
    access = JSON.parse(localStorage.getItem('access_token'));
    tosend = `Bearer ${access}`;

    let title = document.getElementById('posttitle').value;
    let content = document.getElementById('content').value;
  
    let message = document.getElementById('messagesinfo');
    let form = document.getElementById('postform');

    user_hood = localStorage.getItem('user_profile_hood');
    fetch('https://hoodnewss.herokuapp.com.com/api/v1/businesses/' + user_hood + '/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'Authorization': tosend,
            },
            body: JSON.stringify({
                post_title:title,
                post_content:content,
                
            })
        })
    .then((res) => {
        console.log(res)
        message.style.display = 'block'
        message.innerHTML = 'Business Successfully Saved!';
        form.reset()
        window.location.href='business_list.html';
    })
    .catch((err) => {
        console.log(err)
        form.reset()
        message.style.display = 'block'
        message.innerHTML = 'Please use another Title!';
    });
    e.preventDefault();
}

document.getElementById('postform').addEventListener('submit', createPostsHandler);