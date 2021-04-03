export class CookieHandler {
    constructor(){
        
    }

    cookieValue(val){
        return document.cookie.split('; ').find(row => row.startsWith(`${val}=`)).split('=')[1];
    }
    cookieIsExist(name){
        return document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`));
    }

    cookieSet(name,value,days){
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
  
    cookieDelete(name){
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
