import Cart from '/public/js/foodies-cart.js';
import Search from '/public/js/foodies-search.js';

let initMenu = () =>{
    return  fetch("./food/all").then((response) => { return response.json()});

} 
class menuContext {

    constructor(menu,cart) {
        this.menu = menu;
        this.cart = cart;
        this.backgroundFood = [].slice.call(document.querySelectorAll("#menu >  *:not(.contain)"))

        //Init the elements on navElements object
        this.navElements = {};
        [].slice.call(document.querySelector("#categorieFood").children).forEach(
            (el) => {
            this.navElements[el.hash] = el;
        });

        this.hashElements = Object.keys(this.navElements);

        this.currentIndex = 0;

        this.currentElement = this.hashElements[this.currentIndex];

        this.initArticles("pizza");
    }
    
    get nav__navElements() {
        return this.navElements;
    }
  
    initArticles = async (e) => {

            swiper.removeAllSlides();
            let menu = await this.menu;
            Object.entries(menu[e]).map((element) => {

                let {imgLink,title,desc,price} = element[1];
                let myArticle;
                let contain = document.querySelector(".contain");
                let cpyArticle = document.querySelector(".cpy");
                myArticle = cpyArticle.cloneNode(true);
                contain.appendChild(myArticle)
                myArticle.classList.add("create");
                let imgArticle = document.querySelector('.create .img-article');
                imgArticle.style.backgroundImage = `url('../public/img${imgLink}')`;
                let titleArtice = document.querySelector(".create h1");
                titleArtice.innerText = title;
                let articlePrice = document.querySelector(".create .price-menu");
                articlePrice.innerText = price + "$";
                let descArticle = document.querySelector(".create .recipe-menu");
                descArticle.innerText = desc;
                let addToCartItem = document.querySelector(".create .addToCart");
                addToCartItem.addEventListener("click", (e) => {
                    let quantityToAdd = e.target.parentNode.getElementsByClassName('quantity');
                    this.cart.addItem(e.target.getAttribute("item"),quantityToAdd[0].value);
                })
                addToCartItem.setAttribute("item", `../public/img${imgLink}+${title}+${desc}+${price}`);
                myArticle.classList.remove("create");
                myArticle.classList.remove("cpy");
                myArticle.remove();
                swiper.appendSlide(myArticle);
            });
        }
    clickHandler = (e) => {
        let req = e.target;

        //Send ajax Request to initialise the shop elements
        this.initArticles(req.hash.replace('#', ''));

        //Clean the initial selection from classes  
        this.backgroundFood.filter(el =>
            el.classList.contains(this.currentElement.replace('#', ''))
        )[0].style.zIndex = "0";
        [].slice.call(document.querySelector("#categorieFood").children).forEach((el) => {
            el.className = "";
        });

        let currentIndex = this.currentIndex = this.hashElements.findIndex(element => element == req.hash);
        this.currentElement = this.hashElements[this.currentIndex];
        this.navElements[this.currentElement].classList.add("selected");
        let navElements = this.navElements;
        switch (currentIndex) {
            case 0:
                navElements[this.hashElements[currentIndex + 1]].classList.add("border-radius-left");
                break;
            case this.hashElements.length - 1:
                navElements[this.hashElements[currentIndex - 1]].classList.add("border-radius-right");
                break;
            default:
                navElements[this.hashElements[currentIndex + 1]].classList.add("border-radius-left");
                navElements[this.hashElements[currentIndex - 1]].classList.add("border-radius-right");
                break;
        }
        this.backgroundFood.filter(el =>
            el.classList.contains(req.hash.replace('#', ''))
        )[0].style.zIndex = "1";
    }

};

//Stop bubling on click
document.querySelector("#categorieFood a > *,.addToCart  * ").addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
});

//Waiting to load the slider script and then init the menu,cart and the search module
$.when(
    $.getScript('/public/js/swiperInit.js'),
    $.Deferred((deferred) => {
        $(deferred.resolve);
    })).done(() => {
    let menuJson = initMenu().then(res =>{ return res; });
    new Search(menuJson);
    let menu = new menuContext(menuJson,new Cart());

    Object.entries(menu.nav__navElements).forEach((element) => {
        element[1].addEventListener("click", (e) => {
            menu.clickHandler(e)
        });

    });
})