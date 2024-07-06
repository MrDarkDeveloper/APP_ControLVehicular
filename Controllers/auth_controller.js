function login(loginData) {
    $.ajax({
        url: env + "/auth/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(loginData),
        success: function(response) {
            console.log(response)
            window.localStorage.setItem("user_id", response.id_user);
            console.log(window.localStorage.getItem("user_id"));
            loadPartialView('main', document.querySelector('.content'));
        }
    })
}