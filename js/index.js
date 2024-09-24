var inputNameSignUp = document.querySelector("#nameSignUp");
var inputEmailSignUp = document.querySelector("#emailSignUp");
var inputPasswordSignUp = document.querySelector("#passwordSignUp");

var inputEmailLogIn = document.querySelector("#emailLogIn");
var inputPasswordLognIn = document.querySelector("#passwordLognIn");

var signUpPage = document.getElementById("signUpPage");
var logInPage = document.getElementById("logInPage");
var WelcomPage = document.getElementById("WelcomPage");
var welcomeUserName = document.getElementById("welcomeUserName");

var btnSignUp = document.querySelector("#btnSignUp");
var btnLogIn = document.querySelector("#btnLogIn");
var btnLogOut = document.querySelector("#btnLogOut");


var users = JSON.parse(localStorage.getItem("usersM")) || []
var usersNamesList = []; //used to Authenticat user email when signup

{//functions to hide and show elments in html by changein display
    function showElmentById(id) {
        document.getElementById(id).classList.add("d-block");
        document.getElementById(id).classList.remove("d-none");
    }
    function hideElmentById(id) {
        document.getElementById(id).classList.remove("d-block");
        document.getElementById(id).classList.add("d-none");
    }
}

{//signup page
    function addNewUser() {
        if (JSON.parse(localStorage.getItem("usersM"))) {
            for (let i = 0; i < users.length; i++) {
                usersNamesList.push(users[i].email)
            }
        }

        if (usersNamesList.length != 0) {
            if (usersNamesList.includes(inputEmailSignUp.value)) {
                showElmentById("signUpEmailInvalid");
            }
            else {
                users.push({
                    userName: inputNameSignUp.value,
                    email: inputEmailSignUp.value,
                    password: inputPasswordSignUp.value
                })
                localStorage.setItem("usersM", JSON.stringify(users));
                hideElmentById("signUpEmailInvalid");
                {// swtching to login page
                    showElmentById("logInPage")
                    hideElmentById("signUpPage");
                }
                clearInputs();
            }

        }else{
            users.push({
                userName: inputNameSignUp.value,
                email: inputEmailSignUp.value,
                password: inputPasswordSignUp.value
            })
            localStorage.setItem("usersM", JSON.stringify(users));
            hideElmentById("signUpEmailInvalid");
                {// swtching to login page
                    showElmentById("logInPage")
                    hideElmentById("signUpPage");
                }
            clearInputs();
        }
    }// end function addNewUser

    function clearInputs() {
        var inputs = document.querySelectorAll("input");
        var inputsArr = Array.from(inputs);
        for (let i = 0; i < inputsArr.length; i++) {
            inputs[i].value = null
        }
    }//end function clearInputs

    btnSignUp.addEventListener("click", function () {
        addNewUser();
        hideElmentById("logInNameInvalid")
        hideElmentById("logInPasswordInvalid")
    })

}


{//--------------login page------------//

    function UserAuthentication() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == inputEmailLogIn.value && users[i].password === inputPasswordLognIn.value) {
                showElmentById("WelcomPage");
                hideElmentById("logInPage")
                welcomeUserName.innerHTML = users[i].userName;
                clearInputs()
                hideElmentById("logInNameInvalid")
                hideElmentById("logInPasswordInvalid")
                return true
            }
        }
    }// end function UserAuthentication

    function invalidUser(AuthenticationFunction) {
        if (!AuthenticationFunction) {
            showElmentById("logInNameInvalid");
            showElmentById("logInPasswordInvalid");
        }
    }// end function invalidUser

    btnLogIn.addEventListener("click", function () {
        invalidUser(UserAuthentication())
    })

    btnSwtchToSignUpPage.addEventListener("click", function () {
        showElmentById("signUpPage")
        hideElmentById("logInPage")
    })
}

{//welcom page
    btnLogOut.addEventListener("click", function () {
        showElmentById("logInPage");
        hideElmentById("WelcomPage")
    })
}