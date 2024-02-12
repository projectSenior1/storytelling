const db = require("../database/mysql")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getAllusers = ((req,res)=>{
    db.query("SELECT * FROM users",(err,result)=>{
        err? res.send(err) : res.json(result)
    })
})
const getoneuser= ((req,res)=>{
    db.query(`SELECT * FROM users WHERE id=?`,[req.params.id],(err,result)=>{
        err? res.send(err) : res.json(result)
    })
})

const add =((req,res)=>{
    const sql= `insert into users set ?`
    db.query(sql,req.body,(err,result)=>{
        err? res.send(err) : res.status(201).json(result)
    })
})

const register = async(req,res)=>{
   const {email,name,password,image} = req.body
   console.log(req.body);
   try{
    const hashPassword = await bcrypt.hash(password,10)
    console.log(hashPassword);

    const newUser = { 
        email,
        name,
        password : hashPassword,
        image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        } 
        add({body:newUser},res)

    }
catch(err){res.status(500).send(err)}
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], async (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send('User not found');
            }
            const user = results[0];
            const matchh = await bcrypt.compare(password, user.password);
            if (matchh) {
                const token = jwt.sign({ id: user.id, email: user.email }, '123');
                res.status(200).json({ token , user  });
            } else {
                res.status(401).send('Invalid ');
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};





module.exports = {getAllusers , add , register , login,getoneuser}