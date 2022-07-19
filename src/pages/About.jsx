import React from "react";

function About() {
  return (
    <div className="about">
      {/* section */}
      <div className="section">
        <div className="title">About Me</div>
        <p>
          Hello. I am doing my Bachelors in Infomation Technology from VJTI
          Mumbai,one of the oldest engineerng college in India. I am always up
          for exploring new arenas for learning. I have a special non-academic
          interest in history,knowing about human behaviour and psychology. I ❤️
          eating food and trying different cuisines.
        </p>
      </div>
      
      <div className="section">
      <div className="title">Skills</div>
        <h1 >Compupter Science</h1> <br />
          <p class="skill-th">
            I ❤️ computer programming and loves problem solving using computational approach. I have an keen intersest
            in exploring different computer programming concepts.
          </p><br />
          <h1>Wev Developer</h1><br />
          <p>I am beginner level web developer and currently learning MERN stack.I have good knowledge of
            web designing and styling.
          </p><br />
          <h1>Content Creator</h1><br />
          <p>
            I do create content for my Youtube channel named 
            <a href="http://www.youtube.com/ninjaarashii">
              <h1>Helpidea by Ankit</h1>
            </a>
            where my main motive is to help student community.There I am having
            subscriber base over 7.5K.
          </p>
      </div>
     
    </div>
  );
}

export default About;
