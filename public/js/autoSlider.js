//Slide background effect
let slide  = () => {
    let isMobile = window.innerWidth <= 768 ,childWidth,viewEl;
    childWidth = isMobile ? 100 : 50;
    viewEl = isMobile ? 1 : 3;
    let containSlide = document.querySelector('.containSlide');
    let slider = Object.values(containSlide.children);
    let posSlide = 0;

    window.addEventListener("resize",()=>{
        isMobile = window.innerWidth <= 768;
        childWidth = isMobile ? 100 : 50;
        viewEl = isMobile ? 1 : 3;
        if(isMobile && slider[0].innerWidth !== 100 || !isMobile && slider[0].innerWidth  !== 50){
            for(let i = 0 ; i < slider.length; i++){ 
                slider[i].style.width = childWidth + "%"; 
            }
        }
        posSlide = 0;
        containSlide.classList.add('notransition');
        containSlide.style.transform = `translateX(-${posSlide = 0}%)`;
        containSlide.offsetHeight;
       
        containSlide.classList.remove('notransition');
    })

    slider.forEach((element,i) => {
        element.style.backgroundImage = `url('/public/img/${i+1}.jpg')`;
        element.style.backgroundRepeat = `no-repeat`;
        element.style.backgroundSize = `cover`;
        element.style.width = `50%`;
        if(isMobile){
            element.style.width = `100%`;
        }
    });

    setInterval(()=>{
        if((slider.length - viewEl) * 100 > posSlide){
           posSlide += childWidth;
        }else{
            posSlide = 0;
        }
        containSlide.style.transform = `translateX(-${posSlide}%)`;

    },posSlide == 0 ? 20000:14000);

}



//Execution part
(()=>{slide();})();




