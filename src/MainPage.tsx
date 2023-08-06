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
}

const MainPage: React.FC = () => {
  const [deceasedList, setDeceasedList] = useState<Deceased[]>([]);

  useEffect(() => {
    fetchDeceasedDetails();
  }, []);

  const fetchDeceasedDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5020/get_deceased_details"
      );
      setDeceasedList(response.data);
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

  const rowData = organizeDataIntoRows(deceasedList);

  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/login">Login </Link>
      <div className="content-container">
        <div className="image-gallery">
          {rowData.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((deceased) => (
                <div key={deceased._id} className="deceased-square">
                  <p>Name: {deceased.name}</p>
                  <p>Date of Death: {deceased.dateOfDeath}</p>
                  <p>Difference: {deceased.difference} days</p>
                  {deceased.photo_id && (
                    <div className="aspect-ratio-box">
                      <img
                        src={`data:image/jpeg;base64,${deceased.photo_id}`}
                        alt={deceased.name}
                        className="deceased-image"
                      />
                    </div>
                  )}
                  <hr />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
