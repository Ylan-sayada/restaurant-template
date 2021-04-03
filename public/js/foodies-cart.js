import {CookieHandler} from '/public/js/foodies-cookieHandler.js';

export default class Cart {

    constructor() {
        this.cookie = new CookieHandler();
        this.listArticle = [];
        if (this.cookie.cookieIsExist('cartArticle')) {
            this.listArticle.push(this.initCart());
        }
        
        this.container = document.querySelectorAll(".submenu.cart");
        this.counter = document.querySelector(".counter-shop");

    }
    initCart = () =>{
        this.cookie.cookieValue('cartArticle').split('~').map((el) => {
            let innerEl = el.split('+');
                return {
                    imgLink: innerEl[0],
                    title: innerEl[1],
                    desc: innerEl[2],
                    price: innerEl[3],
                    qty: innerEl[4]
                }
        })
    }
    addItem = (el, quantity) => {
        if (this.listArticle.length == 0) {
            this.cookie.cookieSet('cartArticle', el + '+' + quantity, 1);
        } else {

            this.article.forEach(item =>{
               if(item.split('+')[1] === el.split('+')[1]){
                   item[4] += quantity;
               }
            });
            this.cookie.cookieSet('cartArticle',`${this.cookie.cookieValue('cartArticle')}+~+${el}+${quantity}`,1);
        }

        console.log(this.listArticle);
    }
};