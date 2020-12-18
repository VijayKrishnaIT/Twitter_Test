/************************************************************************************************
 * Your task is to build a very simple version of the Twitter timeline using React and ES6.
 *
 * Requirements:
 *   - The UI should consist of a new tweet text input, a submit button, and a
 * .   timeline consisting of tweets.
 * . - New tweets submitted by the "logged in user" should be added to the timeline
 * . - Create whatever components you might need to build this UI.
 * .
 * We've provided a Tweet component and a parent component called MiniTwitter already
 * added to the DOM. Take a look at MiniTwitter's state.
 ***********************************************************************************************/
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

const Tweet = ({ username, text }) => {
  return (
    <div className="tweet">
      <h1>{username}</h1>
      <p>{text}</p>
    </div>
  );
};

const Button = ({ children, ...otherProps }) => {
  return <button {...otherProps}>{children}</button>;
};

const Input = ({ name, placeholder, type, ...otherProps }) => {
  return (
    <input name={name} placeholder={placeholder} type={type} {...otherProps} />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
};

const MiniTwitter = () => {
  const [timeline, setTimeline] = useState([
    { text: "I tweeted", userId: 14, username: "Jane Doe" },
    { text: "Hello world", userId: 15, username: "Joe Shmoe" },
    { text: "Hello again", userId: 15, username: "Joe Shmoe" },
  ]);

  const [loggedInUser, setLoggedInUser] = useState({
    userId: 14,
    username: "Jane Doe",
  });

  const [inputVal, setInputVal] = useState("");

  const onChangeInput = (e) => setInputVal(e.target.value);
  const onSubmit = (e) => {
    setInputVal("");
    e.preventDefault();
    setTimeline([
      {
        text: inputVal,
        userId: loggedInUser.userId,
        username: loggedInUser.username,
      },
      ...timeline,
    ]);
  };

  console.log(timeline);
  return (
    <div>
      <form className="form">
        <div>Profile Image</div>
        <div className="field">
          <Input
            name="comment"
            value={inputVal}
            placeholder="what's happening ?"
            onChange={onChangeInput}
          />
          <div>
            <div>Icons</div>
            <Button type="submit" onClick={onSubmit}>
              Tweet
            </Button>
          </div>
        </div>
      </form>
      <div>
        {timeline.map(({ text, username, id }) => (
          <Tweet text={text} username={username} key={id} />
        ))}
      </div>
    </div>
  );
};

export default MiniTwitter;
