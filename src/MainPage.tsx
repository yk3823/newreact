import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

interface Deceased {
  _id: string;
  name: string;
  dateOfDeath: string;
  photo_id: string | null;
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
  const organizeDataIntoColumns = (data: Deceased[]) => {
    const columns: Deceased[][] = [];
    for (let i = 0; i < data.length; i += 3) {
      const columnItems = data.slice(i, i + 3);
      columns.push(columnItems);
    }
    return columns;
  };
  const columnsData = organizeDataIntoColumns(deceasedList);

  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/login">Login </Link>
      <div className="deceased-container">
        {columnsData.map((column, columnIndex) => (
          <div key={columnIndex} style={{ flex: 1 }}>
            {column.map((deceased) => (
              <div key={deceased._id} className="deceased-square">
                <p>Name: {deceased.name}</p>
                <p>Date of Death: {deceased.dateOfDeath}</p>
                {deceased.photo_id && (
                  <img
                    src={`http://localhost:5020/get_image/${deceased.photo_id}`}
                    alt={deceased.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
