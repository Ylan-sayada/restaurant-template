export default class Search {
    constructor(items){
        this.items =   items;
        this.containers = document.querySelectorAll('.submenu .search-response');
        this.searchInput = document.querySelectorAll('.input-search input');
        this.searchInput.forEach(el =>{
            el.addEventListener('keyup',e =>{ 
            this.result(e);
        });
    });
    }

    result = async  (e) =>{
        this.containers.forEach(el =>{
            el.innerHTML ="";
        });
        let request = e.target.value.toLowerCase();
        let article = await this.items;
        let keys = Object.keys(await this.items),articleKeys;
        keys.forEach(elements =>{

            articleKeys =  Object.keys(article[elements])
            articleKeys.filter( i => article[elements][i].title.toLowerCase().includes(request))
            .forEach(finalRes =>{

                let {imgLink,title,desc,price} = article[elements][finalRes];
                this.containers.forEach(container =>{
                    container.appendChild(this.makeAnElement(imgLink,title,desc,price));
                });
            });
        })
        this.containers.forEach(el =>{
            if(el.innerHTML === ""){
                el.innerHTML = "<p>No Items Found</p>";
            }
            if(e.target.value === ""){
                el.innerHTML = "<p></p>";
            }
        });
        
}
        makeAnElement = (bg,title,desc,price) =>{
            let tmp  = document.createElement('div')
            tmp.classList.add('item-requested');
            tmp.innerHTML = `
                <div class="img-response" style =" background: url('../public/img${bg}') center no-repeat;"></div>
                <div class="desc">
                    <h4 class="bold">${title}</h4>
                    <p>${desc}</p>
                    <p class="small">${price} $</p>
                </div>
                `
                return tmp;
        }

}