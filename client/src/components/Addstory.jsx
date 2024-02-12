import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Addstory = ({ id }) => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/category/getAll`)
      .then((res) => {
        setCategory(res.data);
        console.log("Categories:", res.data);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    console.log("Selected File:", file);
    formData.append("file", file);
    formData.append("upload_preset", "project");

    axios.post("https://api.cloudinary.com/v1_1/ds3tmq5iw/image/upload", formData)
      .then((res) => {
        console.log("Upload successful:", res.data);
        setImage(res.data.secure_url);
      })
      .catch((error) => {
        console.error("Error uploading", error);
      });
  };

  const add = () => {
    if (!title || !story) {
      alert("You have to add a title and story");
      return;
    }

    axios.post("http://localhost:5000/story/post", {
      title: title,
      story: story,
      image: image,
      users_id: id,
      category_id: select,
    })
      .then((res) => {
        console.log("Story added successfully:", res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error adding story:", err);
      });
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div>
      <nav className="nav">
        <ul>
          <li className="active">
            <Link to="/home" className="home">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <div className="addstory-container">
        <div>
          <label htmlFor="newTitle">Title:</label>
          <input
            className="t"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="newTitle"
          />
        </div>
        <div>
          <label htmlFor="newStory">Story:</label>
          <textarea
            className="s"
            onChange={(e) => setStory(e.target.value)}
            id="newStory"
          />
        </div>
        <div>
          <label htmlFor="newImageUrl">Image:</label>
          <input
            className="im"
            type="file"
            onChange={handleImageChange}
         
          />
        </div>
        <div>
          <select onChange={handleSelect}>
            <option value="all">All Categories</option>
            {category.map((el, i) => (
              <option value={el.id} key={i}>{el.name}</option>
            ))}
          </select>
        </div>
        <div className="okk" onClick={add}>
          Post Now
        </div>
      </div>
    </div>
  );
};

export default Addstory;
