import React from "react";
import Popup from "reactjs-popup";
import "./NewsCard.css";

function NewsCard(props) {
  return (
    <div className="newsCard-container">
      <div className="newsCard-header">
        <h1>{props.newsTitle}</h1>
      </div>
      <div className="newsCard-main">
        <img src={props.newsImage} />
      </div>
      <div className="newsCard-footer">
        <p>{props.newsDescription}</p>
        <Popup trigger={<button>See Full Article</button>}>
          {(close) => (
            <div className="card-popup-container">
              <div className="card-popup-inner">
                <div className="card-popup-header">
                  <div className="card-popup-header-top">
                    <h1>{props.newsTitle}</h1>
                  </div>
                  <div className="card-popup-header-bottom">
                    <p className="news-url">{props.newsSource}</p>
                    <p>{props.newsPublishedAt}</p>
                  </div>
                </div>
                <div className="card-popup-main">
                  <img src={props.newsImage} />
                  <p>{props.newsContent} <a href={props.newsUrl} target="_blank" rel="noreferrer"> Read More</a></p>
                  
                </div>
                <div className="card-popup-footer">
                  {/* <p>{props.newsUrl}</p> */}
                  <button
                    onClick={() => {
                      close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}

export default NewsCard;
