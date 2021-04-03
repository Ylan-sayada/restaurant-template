
document.querySelector('.goToButton').addEventListener("animationend",(button)=>{
    button.target.style.animation = "play 4s infinite";
});
//button to scroll at the menu
window.smoothScroll = (target) => {
    let offSetByNav = document.querySelector(".nav").getBoundingClientRect().height;
    let scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
        if(scrollContainer.tagName === "HTML")
            break;
    } while (scrollContainer.scrollTop == 0);
    
    let targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    let scroll = (c, a, b, i) => {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(() => { scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop ,targetY - offSetByNav,0);
    
};