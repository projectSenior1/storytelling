import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersStories = ({userstory}) => {

 

  return (
    <div>
      {userstory.map((story) => (
        <div key={story.id}>
          <h2>{story.title}</h2>
          <p>{story.story}</p>
          <img src={story.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default UsersStories;
