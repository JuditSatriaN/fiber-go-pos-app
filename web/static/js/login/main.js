$("#user_name").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#btnLogin").click();
    }
});

$("#password").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#btnLogin").click();
    }
});

function triggerBtnLogin() {
    let userNameObj = $("#user_name");
    let passwordObj = $("#password");

    let user_name = userNameObj.val().trim();
    if (user_name === "") {
        buildErrorPopup("Field username masih kosong!");
        return false
    }

    let password = passwordObj.val().trim();
    if (password === "") {
        buildErrorPopup("Field password masih kosong!");
        return false
    }

    processLogin(user_name, password);
}


function processLogin(user_name, password) {
    let baseURL = $('#baseURL').text();
    let serverURL = $('#serverURL').text();
    let loadingIndicator = $('body').loadingIndicator().data("loadingIndicator");

    axios({
        method: 'POST',
        url: serverURL + "api/login",
        data: {"user_name": user_name, "password": password},
    }).then(function (response) {
        console.log("RESPONSE : ", response)
        // handle success
        response = response.data
        sessionStorage.setItem("user_id", response["user_id"]);
        sessionStorage.setItem("user_name", response["user_name"]);
        sessionStorage.setItem("full_name", response["full_name"]);
        document.cookie = "jwtPOSAccessToken="+ response["jwt_access_token"];
        window.location.href = baseURL + "pos";
    }).catch(function (error) {
        buildErrorPopup(error.response.data.message);
    }).finally(function () {
        loadingIndicator.hide();
    });
}