"use strict"

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
const usersEmailsList = []; //used to Authenticat user email when signup

//functions to hide and show elments in html by changein display
function showElmentById(id) {
    document.getElementById(id).classList.add("d-block");
    document.getElementById(id).classList.remove("d-none");
}
function hideElmentById(id) {
    document.getElementById(id).classList.remove("d-block");
    document.getElementById(id).classList.add("d-none");
}


//signup page
function validatUserNameSignUp() {
    const regexUserName = /^[a-zA-Z]{3,}$/
    if (regexUserName.test(inputNameSignUp.value)) {
        hideElmentById("signUpNameInvalid")
        return true
    } else {
        showElmentById("signUpNameInvalid")
        return false
    }
}//end validatUserNameSignUp
function validatEmailSignUp(){
    createUsersEmailsList();
    const regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if(regexEmail.test(inputEmailSignUp.value) && !usersEmailsList.includes(inputEmailSignUp.value)){
        hideElmentById("signUpEmailInvalid");
        return true;
    }else{
        showElmentById("signUpEmailInvalid");
        return false;
    }
}// end validatEmailSignUp

function validatPasswordSignUp(){
    const regexPassword = /[A-Z]\d/
    if(regexPassword.test(inputPasswordSignUp.value)){
        hideElmentById("signUpPasswordInvalid");
        return true;
    }else{
        showElmentById("signUpPasswordInvalid");
        return false;
    }
}// end validatPasswordSignUp

function addNewUser() {
    if (validatUserNameSignUp() & validatEmailSignUp() & validatPasswordSignUp()) {
        pushNewUserToUsersArr();
    }
}// end function addNewUser

function clearInputs() {
    const inputs = document.querySelectorAll("input");
    const inputsArr = Array.from(inputs);
    for (let i = 0; i < inputsArr.length; i++) {
        inputs[i].value = null
    }
}//end function clearInputs

function createUsersEmailsList() {
    if (JSON.parse(localStorage.getItem("usersM"))) {
        for (let i = 0; i < users.length; i++) {
            usersEmailsList.push(users[i].email)
        }
    }
}//end createUsersEmailsList

function pushNewUserToUsersArr() {
    users.push({
        userName: inputNameSignUp.value,
        email: inputEmailSignUp.value,
        password: inputPasswordSignUp.value
    })
    localStorage.setItem("usersM", JSON.stringify(users));
    hideElmentById("signUpEmailInvalid");
    // swtching to login page
    showElmentById("logInPage")
    hideElmentById("signUpPage");

    clearInputs();
    hideElmentById("logInNameInvalid");
    hideElmentById("logInPasswordInvalid");
}//end pushNewUserToUsersArr

btnSignUp.addEventListener("click", function () {
    addNewUser();
})


//--------------login page------------//

function userAuthentication() {
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
}// end function userAuthentication

function invalidUser(authenticationFunction) {
    if (!authenticationFunction) {
        showElmentById("logInNameInvalid");
        showElmentById("logInPasswordInvalid");
    }
}// end function invalidUser

btnLogIn.addEventListener("click", function () {
    invalidUser(userAuthentication())
})

btnSwtchToSignUpPage.addEventListener("click", function () {
    showElmentById("signUpPage")
    hideElmentById("logInPage")
})


//welcom page
btnLogOut.addEventListener("click", function () {
    showElmentById("logInPage");
    hideElmentById("WelcomPage")
})
