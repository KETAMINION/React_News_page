import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NewsCard from "./NewsCard/NewsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./App.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 2001 },
    items: 3,
  },
  desktopLarger: {
    breakpoint: { max: 2000, min: 1701 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1700, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1150, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function App() {
  const [newsData, setNewsData] = useState([]);
  const [newsCategory, setNewsCategory] = useState("general");
  const [apiKey, setApiKey] = useState(null);

  //Array of Api Keys - only 100 requests per day - funcionality written below
  const apiKeyArray = [
    "f642e5db4cb56e67d492387771d7175b",
    "28c29936c511f98841da6140847ba9b0",
    "336711b6581889137bc15ba842aa334d",
    "83249efc68ab791a030fe59e0de81cf0",
  ];
  // let newsQuery = "cars";

  useEffect(() => {
    if (!apiKey) {
      setApiKey(apiKeyArray[0]);
    }
    newsFetch(apiKey, newsCategory);
  }, [newsCategory, apiKey]);

  async function newsFetch(apiKey, newsCategory) {
    try {
      const response = await fetch(
        // `https://gnews.io/api/v4/search?q=${newsQuery}&apikey=${apiKey}&lang=en&country=us&max=10`,
        `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&category=${newsCategory}&lang=en&country=us&max=10`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNewsData(data.articles);
      console.log(data.articles)
    } catch (error) {
      console.error(error);
      //Funcionality for switching between Api keys if Error
      let apiArrayIndex = apiKeyArray.indexOf(apiKey);
      if (apiArrayIndex === 3) {
        setApiKey(apiKeyArray[0]);
        return;
      }
      setApiKey(apiKeyArray[apiArrayIndex + 1]);
    }
  }

  return (
    <div className="app-container">
      <div className="app-container-header">
        <div className="app-container-header-top">
          <h1>The Onion News</h1>
        </div>
        <div className="app-container-header-bottom">
          <label htmlFor="newsCategory">News Category </label>
          <select
            id="newsCategory"
            value={newsCategory}
            onChange={(e) => {
              setNewsCategory(e.target.value);
            }}
          >
            <option value="general">General</option>
            <option value="world">World</option>
            <option value="nation">Nation</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
          </select>
        </div>
      </div>
      <div className="app-container-main">
        <Carousel
          responsive={responsive}
          infinite={true}
          centerModåe={false}
          containerClass="app-container-main"
        >
          {newsData.map((card) => {
            return (
              <NewsCard
                key={uuidv4()}
                newsDescription={card.description}
                newsImage={card.image}
                newsTitle={card.title}
                newsSource={card.source.url}
                newsPublishedAt={card.publishedAt}
                newsContent={card.content}
                newsUrl={card.url}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default App;
