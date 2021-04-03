let dotenv = require('dotenv').config();
class InitEnv {
    constructor(){
        this.port  = process.env.NODE_PORT;
        this.environment = process.env.NODE_ENV;
    }
    start(){
        if(this.environment === 'development'){
            console.log(`mode : ${this.environment} port : ${this.port}`);
            return this.port;
        }
    }
}
module.exports = new InitEnv;