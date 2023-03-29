window.auto_logout_time = 15; //min
window.count_left_time_sec = 1;

setInterval(() => {
    let idle_sec = window.count_left_time_sec++;
    sessionStorage.setItem('idle_time',1000 * idle_sec );

    if(1000*idle_sec == window.auto_logout_time*60*1000 ){
        window.clear_session();
        window.location = '/login';
    }
}, 1000);

window.clear_session = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('last_time');
}

window.logout = () => {
    window.clear_session();
    if(window.confirm('want to logout??')){
        axios.post('/user/api-logout')
            .then(res=>{
                window.location='/';
            })
    }
}
