import {CookieHandler} from '/public/js/foodies-cookieHandler.js';
let cookieHandler = new CookieHandler();

if (cookieHandler.cookieIsExist('username')) {
    let cookieValue = cookieHandler.cookieValue('username');
    cookieValue = cookieValue.charAt(0).toUpperCase() + cookieValue.slice(1);
    if(location.pathname === "/login"){
        document.querySelector(".login-form").style.display = "none";
        let connectedMsg = document.createElement("div");
        let title = document.createElement("h4");
        let msg = document.createElement("p");
        title.innerText ="Well done!";
        msg.innerHTML = `${cookieValue} ! </br> You are connected!`;
        connectedMsg.classList.add("alert","alert-success");
        connectedMsg.setAttribute("role","alert");
        connectedMsg.appendChild(title);
        connectedMsg.appendChild(msg);
        document.querySelector(".contain-form").appendChild(connectedMsg);
    }
    else{
        [].slice.call(document.querySelectorAll(".left-part .full-nav .menu")).forEach(el =>{
        el.classList.add("none");
    });

    document.querySelector(".left-part .toggle").classList.add("none");
    let loginOutput = document.createElement("p");
    let signOut = document.createElement("a");
    signOut.href = "/disconnect";
    signOut.style.marginLeft = "10px";
    signOut.innerText=" Sign out";
    loginOutput.style.textAlign = "center";
    loginOutput.innerText =`Hello ${cookieValue}!  | `;
    document.querySelector(".left-part").appendChild(loginOutput);
    document.querySelector(".left-part").appendChild(signOut);
}
}
