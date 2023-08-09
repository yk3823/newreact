import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

interface Deceased {
  _id: string;
  name: string;
  dateOfDeath: string;
  photo_id: string | null;
  difference: number;
  hebrew_date: string;
}

const MainPage: React.FC = () => {
  const [deceasedList, setDeceasedList] = useState<Deceased[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    fetchDeceasedDetails();
  }, [currentPage]);

  const handleSearchClick = () => {
    // blabla
  };

  const fetchDeceasedDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5020/get_deceased_details?page=${currentPage}&limit=${limit}`
      );
      setDeceasedList(response.data.deceased_details);
    } catch (error) {
      console.error("Error fetching deceased details:", error);
    }
  };

  const organizeDataIntoRows = (data: Deceased[]) => {
    const rows: Deceased[][] = [];
    const numberOfRows = Math.ceil(data.length / 3);

    for (let i = 0; i < numberOfRows; i++) {
      const rowItems = data.slice(i * 3, i * 3 + 3);
      rows.push(rowItems);
    }

    return rows;
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const rowData = organizeDataIntoRows(deceasedList);

  return (
    <div>
      <Link to="/login"> הרשמה </Link>
      <Link to="/contact" className="button">
        | קצת עלינו
      </Link>
      <button className="search-button" onClick={handleSearchClick}>
        חיפוש
      </button>
      <h1>יִזְכּוֹר</h1>
      <h3>אתר הנצחה </h3>

      <div className="content-container">
        <div className="image-gallery">
          {rowData.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((deceased) => (
                <div key={deceased._id} className="deceased-square">
                  {deceased.photo_id && (
                    <div className="aspect-ratio-box">
                      <img
                        src={`data:image/jpeg;base64,${deceased.photo_id}`}
                        alt={deceased.name}
                        className="deceased-image"
                      />
                    </div>
                  )}
                  <div className="deceased-details">
                    <p> {deceased.name}</p>
                    <p>נלב"ע בתאריך: </p>
                    <p>{deceased.hebrew_date}</p>
                    <p>{deceased.dateOfDeath}</p>
                    {/* <p>Difference: {deceased.difference} days</p> */}
                    {/* <p>Hebrew Date: {deceased.hebrew_date}</p> */}
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevious}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default MainPage;
