import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import Cookies from "js-cookie";
import Nav from "./Nav.jsx";

const Storydetails = ({ id }) => {
    const [commentaire, setCommentaire] = useState([]);
    const [One, setOne] = useState({});
    const { title } = useParams();
    const [newcomment, setNewcomment] = useState("");
    const navigate=useNavigate()
console.log(One.id)
    useEffect(() => {
        axios.get(`http://localhost:5000/story/getone/${title}`)
            .then((res) => {
                setOne(res.data[0]);
                axios.get(`http://localhost:5000/comments/getone/${res.data[0].id}`)
                .then((res) => {
                    setCommentaire(res.data);
                })
                .catch((err) => {
                    console.log(err, "errr");
                });
            
            })
            .catch((err) => {
                console.log(err, "errr");
            });
    }, [title]);
    // const update=(id)=>{
    //     axios.put(`http://localhost:5000/story/put/${id}`).then((res)=>{
    //         console.log("updated");
    //         (res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err, "errr");
    //     });
    // }

    const deleting = (id) => {
        axios.delete(`http://localhost:5000/story/del/${id}`)
            .then((res) => {
                console.log("deleted successfully");
                navigate("/home");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err, "errr");
            });
    }

    const deletecomment = (id) => {
        axios.delete(`http://localhost:5000/comments/del/${id}`)
            .then((res) => {
                console.log("comment deleted successfully");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err, "errr");
            });
    }

    const com = {
        describe: newcomment,
        users_id: id,
        stories_id: One.id
    };


    const postcomment = () => {
        if (newcomment.length === 0) { 
            alert("You need to post a comment.")
            return
        }
    
        axios.post("http://localhost:5000/comments/post", com)
            .then(() => {
                console.log("new comment has been posted");
                setNewcomment("");
                axios.get(`http://localhost:5000/comments/getone/${One.id}`)
                    .then((res) => {
                        setCommentaire(res.data);
                    })
                    .catch((err) => {
                        console.log(err, "errr");
                    });
            })
            .catch((err) => {
                console.log(err, "errr");
            });
    };


    return (
        <div>
            <Nav/>

            <div>
                <div className="titledetails">
                    <h2>
                        {One.title}
                        <div className="dropdown">
                            <div className="dots">...</div>
                            <div className="dropdown-content">
                              
                                <a onClick={() => {deleting(One.id) }} href="#">Delete</a>
                            </div>
                        </div>
                    </h2>
                </div>
                <div className="str">
                {One.story} 
  
</div>
                <div className="imgdetails"><img src={One.image} alt="" /></div>

                <form>
                    <div>
                        <textarea onChange={(e) => { setNewcomment(e.target.value) }}  className="commenttt" style={{ fontFamily: 'sans-serif', fontSize: '1.2em' }}></textarea>
                    </div>
                    <button className="comment-button" onClick={() => { postcomment() }}>Comment</button>
                </form>

                <div>
                    {commentaire.map((el) => (
                        <div key={el.id} className="comment">
                            <input type="text" value={el.describe} />
                            <div className="dropdown">
                                <div className="dots">...</div>
                                <div className="dropdown-content">
                                    
                                    <a onClick={() => { deletecomment(el.id) }} href="#">Delete</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           
        </div>
    );
};

export default Storydetails;
