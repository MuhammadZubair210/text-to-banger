// import logo from './TTB.png';
import "./App.css";

import React, { useState } from "react";

import axios from "axios";

function App() {
  const [tweetIdea, setTweetIdea] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [contentType, setContentType] = useState("stocks");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleTweetIdeaChange = (e) => {
    setTweetIdea(e.target.value);
  };

  const handleGenerateTweet = () => {
    setIsLoading(true);
    setGeneratedTweet(null);

    axios
      .post(
        `https://bags-generate-4f2976c7246c.herokuapp.com/generate-banger`,
        {
          originalText: tweetIdea,
          contentType: contentType,
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Request failed with status code ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setGeneratedTweet(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setGeneratedTweet("Error generating banger tweet.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log(generatedTweet);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.style.setProperty(
        "--background-color",
        "var(--light-background-color)"
      );
      document.documentElement.style.setProperty(
        "--text-color",
        "var(--light-text-color)"
      );
      document.documentElement.style.setProperty(
        "--panel-background",
        "var(--light-panel-background)"
      );
      document.documentElement.style.setProperty(
        "--button-background",
        "var(--light-button-background)"
      );
      document.documentElement.style.setProperty(
        "--button-text",
        "var(--light-button-text)"
      );
      document.documentElement.style.setProperty(
        "--border-color",
        "var(--light-border-color)"
      );
      document.documentElement.style.setProperty(
        "--logo-text-color",
        "var(--light-logo-text-color)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--background-color",
        "var(--dark-background-color)"
      );
      document.documentElement.style.setProperty(
        "--text-color",
        "var(--dark-text-color)"
      );
      document.documentElement.style.setProperty(
        "--panel-background",
        "var(--dark-panel-background)"
      );
      document.documentElement.style.setProperty(
        "--button-background",
        "var(--dark-button-background)"
      );
      document.documentElement.style.setProperty(
        "--button-text",
        "var(--dark-button-text)"
      );
      document.documentElement.style.setProperty(
        "--border-color",
        "var(--dark-border-color)"
      );
      document.documentElement.style.setProperty(
        "--logo-text-color",
        "var(--dark-logo-text-color)"
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleGenerateTweet();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerateTweet();
    }
  };

  return (
    <div className="App">
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🌙" : "☀️"}
      </button>
      <header className="App-header">
        <div className="logo-container">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          <h1 className="text-logo">Intern.gg</h1>
        </div>
        <div className="content-container">
          <form onSubmit={handleFormSubmit} className="tweet-form">
            <textarea
              id="tweetIdea"
              value={tweetIdea}
              onChange={handleTweetIdeaChange}
              onKeyDown={handleKeyDown}
              placeholder="What's happening?"
              rows="4"
            />
            {/* <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
              <option value="stocks">Stocks</option>
              <option value="crypto">Crypto</option>
              <option value="nft">NFTs</option>
            </select> */}
            <button className="tweet-button" type="submit" disabled={isLoading}>
              Generate Banger Tweet
            </button>
          </form>
          {isLoading && <p>generating a banger...</p>}
          <div className="generated-tweet-container">
            {generatedTweet && (
              <>
                <p
                  style={{
                    color:
                      typeof generatedTweet == String &&
                      generatedTweet.startsWith("Error")
                        ? "darkred"
                        : "inherit",
                  }}
                >
                  {typeof generatedTweet !== String
                    ? generatedTweet.bangerTweet
                    : generatedTweet}
                </p>
                {"bangerTweet" in generatedTweet && (
                  <a
                    className="tweet-button"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      generatedTweet.bangerTweet
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Post Banger Tweet
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
