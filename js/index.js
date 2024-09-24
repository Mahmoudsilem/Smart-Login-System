const inputNameSignUp = document.querySelector("#nameSignUp");
const inputEmailSignUp = document.querySelector("#emailSignUp");
const inputPasswordSignUp = document.querySelector("#passwordSignUp");

const inputEmailLogIn = document.querySelector("#emailLogIn");
const inputPasswordLognIn = document.querySelector("#passwordLognIn");

const signUpPage = document.getElementById("signUpPage");
const logInPage = document.getElementById("logInPage");
const WelcomPage = document.getElementById("WelcomPage");
const welcomeUserName = document.getElementById("welcomeUserName");

const btnSignUp = document.querySelector("#btnSignUp");
const btnLogIn = document.querySelector("#btnLogIn");
const btnLogOut = document.querySelector("#btnLogOut");


const users = JSON.parse(localStorage.getItem("usersM")) || []
const usersNamesList = []; //used to Authenticat user email when signup

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
        const inputs = document.querySelectorAll("input");
        const inputsArr = Array.from(inputs);
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