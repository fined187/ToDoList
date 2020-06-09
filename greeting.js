const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");
    button = document.querySelector("button");

    // 각각의 value를 html에서 가져와 똑같은 이름의 변수에 담는다.
    // 로직을 돌린다.(js 파일에서는 무조건 로직)

const USER_LS = "currentUser",      //  localStorage에 존재하는 userName(key값)을 담는다.
    SHOWING_CN = "showing";
    LOGOUT = "showing";

function hideInpubt() {
    form.classList.remove(SHOWING_CN);
}

function logOut(button) {           //  Log Out function
    localStorage.removeItem(USER_LS);
    location.reload();
}

function saveName(text) {           //  localStorage에 USER_LS(currentUser의 값) 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {      //  submit이 되면 event 중지, currentValue에 input 값을 넣고, 그 값에 paintGreeting 실행
    const currentValue = input.value;
    event.preventDefault();         //  setName function에 currentValue를 넣음.
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {             //  이름을 물어보는(input text값) 함수 실행, enter 입력 시 submit.
     form.classList.add(SHOWING_CN);
     form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);      //  remove className(input type=text 사라짐)
    greeting.classList.add(SHOWING_CN);     //  showing className(input type=text 보여짐)
    greeting.innerText = `Hello! ${text}`;   //  input text에 입력된 값을 가져와서 표시한다.
}

function loadName() {
    const  currentUser = localStorage.getItem(USER_LS); //  localStorage에 담긴 key값을 currentUser에 담는다.
    if(currentUser === null) {
        askForName();                       //  현재 currentValue값 없을 시 askForName() 실행.
    } else {
        paintGreeting(currentUser);         //  현재 currentValue값 존재할 시 paintGreeting에 currentUser값 넣어 실행.
    }
}

function init() {
    loadName();                             //  loadName() 제일 먼저 실행.
}

init();
