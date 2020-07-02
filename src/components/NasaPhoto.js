import React from "react";
import axios from "axios";
import NavBar from "./Navbar";

function App() {
  let [responseData, setResponseData] = React.useState("");
  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url:
        "https://api.nasa.gov/planetary/apod?api_key=riGVnom5Hn2kTlekDTrodPg3xDT5NYF0QKOyxdT6",
      headers: {
        "x-rapidapi-key": process.env.riGVnom5Hn2kTlekDTrodPg3xDT5NYF0QKOyxdT6,
      },
    })
      .then((response) => {
        setResponseData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!responseData) return <div />;

  return (
    <>
      <NavBar />
      <div className="nasa-photo">
        {responseData.media_type === "image" ? (
          <img
            src={responseData.url}
            alt={responseData.title}
            className="photo"
          />
        ) : (
          <iframe
            title="space-video"
            src={responseData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <div>
          <h1>{responseData.title}</h1>
          <p className="date">{responseData.date}</p>
          <p className="explanation">{responseData.explanation}</p>
        </div>
      </div>
    </>
  );
}

export default App;
