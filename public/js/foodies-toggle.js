let toggleList = document.querySelectorAll(".toggle");
let toggleContent = document.querySelectorAll(".unpack-content");
let toggleMode;
let k = 0;
let resized = false;
let isAnNavIcon = el =>{
    return el.getAttribute("mode") === "navIcon";
}
let isAnChevron = el =>{
    return el.getAttribute("mode") === "chevron";
}

    for(let i = 0; i < toggleList.length ; i++){
        toggleMode = toggleList[i].getAttribute("clickToDisplay");
        if(toggleMode === "chevron" || toggleMode === "navIcon"){
            toggleList[i].setAttribute("content",i);
            if(window.innerWidth < 1000){
            toggleContent[k].classList.toggle("hidden");
            }
            toggleContent[k].classList.toggle("bottom");
            toggleContent[k].setAttribute("mode",toggleMode);
            toggleContent[k++].setAttribute("content",i);
        }
    }

let navIconContentList = Object.values(toggleContent).filter(isAnNavIcon);
let chevronContentList = Object.values(toggleContent).filter(isAnChevron);
let toggle = el => {
    let listOfContent = document.querySelectorAll(".unpack-content");
    
    let toggleMode = el.getAttribute("clickToDisplay");
    switch(toggleMode){
        case "cross":case "bars":
            document.querySelector("#shadow-calc").classList.toggle("none");
            setTimeout(() =>{
                document.querySelector("#lateral-menu").classList.toggle("hidden");
                document.querySelector("#lateral-menu").classList.toggle("side");
                    setTimeout(()=>{
                        document.querySelector(".DSN").classList.toggle("none");
                    },300);
        },100); 
            break;
        case "chevron":
            el.classList.toggle("down");
        case "navIcon":
            navIconContentList.forEach(navIcon =>{
                if(navIcon.getAttribute("content") !== el.getAttribute("content")  && navIcon != el && !navIcon.classList.contains("hidden")){
                    navIcon.classList.add("hidden");
                    navIcon.classList.add("bottom");
                }
            });
        default:
            listOfContent.forEach((listEl) => {
                if(listEl.getAttribute("content") === el.getAttribute("content")){
                    listEl.classList.toggle("hidden");
                    listEl.classList.toggle("bottom");
                }
        });
        break;
    }

}

    toggleList.forEach( (el) =>{
        el.addEventListener("click",(e) =>{ toggle( e.target ) } );
    });
    window.addEventListener('load',()=>{
        if(window.innerWidth >= 1000){
            chevronContentList.forEach(el =>{
                el.classList.add("hidden");
                el.classList.add("bottom");
            })
            navIconContentList.forEach(el =>{
                el.classList.add("hidden");
                el.classList.add("bottom");
            })
        }
    })
    window.addEventListener('resize', () => {
            if(window.innerWidth >= 1000){
                navIconContentList.forEach(el=>{
                    if(!el.classList.contains("hidden")){
                        el.classList.add("hidden");
                    }
                    if(!el.classList.contains("bottom")){
                        el.classList.add("bottom");
                    }
                });
                chevronContentList.forEach(el =>{
                    if(el.classList.contains("hidden")){
                        el.classList.remove("hidden");
                    }
                    if(el.classList.contains("bottom")){
                        el.classList.remove("bottom");
                    }
                })
                resized = true;
            }else if(window.innerWidth < 1000 && resized){
                chevronContentList.forEach(el =>{
                    el.classList.add("hidden");
                    el.classList.add("bottom");
                })
                chevronContentList.forEach(el =>{
                    el.classList.add("hidden");
                    el.classList.add("bottom");
                })
                resized = false;
            }
    })