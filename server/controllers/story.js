const db = require ("../database/mysql")



const getAll = ((req,res)=>{
  db.query("SELECT * FROM stories",(err,result)=>{

      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
  })
})
const getonestory=((req,res)=>{
  const sql="SELECT * FROM stories Where title=?"
  db.query(sql,[req.params.title],(err,results)=>{
    if(err){
      res.send(err)
    }
    else{
      res.json(results)
    }

  })

})
// belahii e5demmmmm

const getcategory = ((req,res)=>{
  db.query(`SELECT * FROM stories JOIN category ON stories.category_id = category.id WHERE stories.category_id = ${req.params.id}`,(err,result)=>{

      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
  })
})


const add =((req,res)=>{
  const sql= `insert into stories set ?`
  db.query(sql,req.body,(err,result)=>{
    if(err){
      res.send(err)
    }
    else{
      res.json(result)
    }
  })
})


const del = (req,res)=>{
  const sql = `delete from stories where id=${req.params.id}`
  db.query(sql,(err,result)=>{
    if(err){
      res.send(err)
    }
    else{
      res.json(result)
    }
  })
}
const update =(req,res)=>{
  const sql = `update stories  set ? where id=${req.params.id}`
  db.query(sql,req.body,(err,result)=>{
    if(err){
      res.send(err)
    }
    else{
      res.json(result)
    }
  })
}
const getstorybyuser=(req,res)=>{
  db.query(`SELECT * FROM stories WHERE users_id= ${req.params.id}`,(err,result)=>{

      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
  })
}

module.exports ={getAll,add,del,update,getcategory,getonestory,getstorybyuser}