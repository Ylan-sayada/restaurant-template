(()=>{
    let el = document.querySelector('.nav');
    let rect = el.getBoundingClientRect()
    let fake = document.createElement('div')
    fake.style.height = rect.height + "px";
    fake.style.width = rect.width + "px";
    el.parentNode.insertBefore(fake,el);
})()