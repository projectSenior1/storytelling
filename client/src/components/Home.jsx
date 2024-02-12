import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import axios from 'axios';

import Cookies from "js-cookie"


//khalil was here


//khalil was here


const Home = ({id}) => {
  const [data, setData] = useState([]);
  const[category,setCategory]=useState([])

  const [search, setSearch] = useState(""); 
  const [filter,setFilter]=useState([])
  const[select,setSelect]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/story/getAll")
      .then((res) => {
        console.log("this is data",data)
        console.log(res.data);
        setData(res.data); 
      })
      .catch((err) => {
        console.log(err, "errr");
      });
  }, []);

  useEffect(()=>{
    axios.get(`http://localhost:5000/category/getAll`).then((res)=>{
      setCategory(res.data)
      console.log("this is category",res.data)
    })
    .catch((err)=>{console.log(err)})
  },[])

 

  const getone = (title) => {
   
    navigate(`/details/${title}`)
   
  }
  const handleOUT=()=>{
     Cookies.remove('id')
     Cookies.remove('token')

  
  }


  const handleSearch = (e) => {
    const query=e.target.value.toLowerCase();
    setSearch(query); 

    const filtered=data.filter((el) =>
      el.title.toLowerCase().includes(query)
    ); 
    setFilter(filtered)
  }

  const handelSelect=(e)=>{
    if(e==="all"){
  setSelect([])
      return
    }
const filtered= data.filter((el)=>{
  return(el.category_id==e)
  
})
if(!filtered.length){
  filtered.push(1)
}
console.log(e,"filtered");
setSelect(filtered)
  }

  return (
    <div>
      <nav className='nav'>
        <ul>
          <li className='active'> 
            <Link to="/home" className="home">Home</Link>
          </li>
          <li className="search-bar">
            <input type="text" placeholder="Search..." onChange={handleSearch} value={search} />
            <button className='sbutton'>Search</button>
          </li>
          <li className="category-bar">
        
            <select  onChange={(e)=>{
            handelSelect(e.target.value)}}>
              <option value="all">All Categories</option>
          {category.map((el,i)=>(
            <option value={el.id} key={i}>{el.name}</option>
          ))}
            </select>
          </li>
          <li>
            <Link to="/Addstory" className="add-story">Add Story</Link>
          </li>
          <Link to="/Sign" className="Sign">sign</Link>
          /
          <Link to="/Log" className="Log">Log</Link>
          /
          <Link onClick={()=>{handleOUT() }} to ='/Log'  className="Log">Logout</Link>


        </ul>
      </nav>

  
<div className='container-flex'>
  {select.length ? (
    select[0] === 1 ? (
      <div>No posts found</div>
    ) : (
      select.map((e) => (
        <div className='conn' key={e.id}>
          <div className='details' onClick={() => getone(e.title)}>
            <h2>{e.title}</h2>
          </div>
          <img src={e.image} alt='Story Image' />
       
        </div>
      ))
    )
  ) : filter.length ? (
    filter.map((e) => (
      <div className='conn' key={e.id}>
        <div className='details' onClick={() => getone(e.title)}>
          <h2>{e.title}</h2>
        </div>
        <img src={e.image} alt='Story Image' />
     
      </div>
    ))
  ) : (
    data.map((e) => (
      <div className='conn' key={e.id}>
        <div className='details' onClick={() => getone(e.title)}>
          <h2>{e.title}</h2>
        </div>
        <img src={e.image} alt='Story Image' />
       
      </div>
    ))
  )}
</div>


      <footer className="footer"> 
        <div className="about-us"> 
          <p>About Us</p>
        </div>
        <div className="social-icons"> 
          <a className='fb' href="https://www.facebook.com/profile.php?id=100007577478945">
            <FaFacebook />
          </a>
          <a className='insta' href="https://www.instagram.com/medkhalilbouarrouj/">
            <FaInstagramSquare/>
          </a>
        </div>
        <div className="contact-us"> 
          <p>Contact Us</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
