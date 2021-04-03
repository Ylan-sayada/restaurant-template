let mysql = require('mysql'); 
let con = mysql.createConnection({
host: "localhost",
user: "root",
password: "password",
database:"LOGIN_REGISTER",
port:3306
});

add = (username,pass,mail) => {
    con.connect(function(err) {
    if (err) throw err;
    let sql = `INSERT INTO customers(username,password,mail) VALUES ('${username}','${pass}','${mail}')`;
    con.query(sql,(err,result) => {
      if(err) throw err;
    });
  });
}

login = async(req,res) => {
  try{
    let response = {
      "error":null
    };
    let {username,password,stayConnected} = req.body;
    let sql = `select username,password from customers where username = '${username}' and password = '${password}'`;
   con.query(sql,(err,result) => {
    if(err) throw err;
    if(result.length > 0){
       res.cookie('username',username,{maxAge: stayConnected == 'on' ? 31556952000 : 36000 ,httpOnly:false});
    }else{
      response.error ='The username or password is incorrect';
    }
    res.render('login',{errMsg : response.error});
  })
  }catch(err){
    console.log(err);
  }
}
 

  module.exports = {
    add,
    login
  };
  

 