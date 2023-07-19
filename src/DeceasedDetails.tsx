import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface Deceased {
  name: string;
  dateOfDeath: string;
  photo: File | null;
}
const DeceasedDetails: React.FC = () => {
  const [deceasedList, setDeceasedList] = useState<Deceased[]>([]);
  const [name, setName] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateOfDeathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateOfDeath(event.target.value);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");

    if (!name) {
      console.error("Missing value for 'fullname' field");
      return;
    }
    if (!dateOfDeath) {
      console.error("no date selected");
      return;
    }
    if (!photo) {
      console.error("No photo selected");
      return;
    }
    const newDeceased: Deceased = {
      name,
      dateOfDeath,
      photo,
    };

    setDeceasedList([...deceasedList, newDeceased]);
    setName("");
    setDateOfDeath("");
    setPhoto(null);
  };

  const handleRemoveDeceased = (index: number) => {
    setDeceasedList((prevDeceasedList) =>
      prevDeceasedList.filter((_, i) => i !== index)
    );
  };

  const handleSaveAllDeceased = async () => {
    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");

    try {
      for (const deceased of deceasedList) {
        const formData = new FormData();
        formData.append("name", deceased.name);
        formData.append("dateOfDeath", deceased.dateOfDeath);
        if (deceased.photo) {
          formData.append("photo", deceased.photo);
        }
        formData.append("token", token || "");

        await axios.post("http://localhost:5020/deceased", formData);
      }

      // Clear the deceased list after successful save
      setDeceasedList([]);
    } catch (error) {
      console.error("Error occurred while saving deceased details:", error);
    }
  };

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("dateOfDeath", dateOfDeath);
  //   formData.append("photo", photo);
  //   formData.append("token", token || "");

  //   try {
  //     await axios.post("http://localhost:5020/deceased", formData);
  //     setName("");
  //     setDateOfDeath("");
  //     setPhoto(null);
  //   } catch (error) {
  //     console.error("Error occurred while saving deceased details:", error);
  //   }
  // };

  return (
    <div>
      <h1>Deceased details</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Date of Death:
          <input
            type="date"
            value={dateOfDeath}
            onChange={handleDateOfDeathChange}
          />
        </label>
        <br />
        <label>
          Photo:
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>

      {deceasedList.length > 0 && (
        <div>
          <h2>Deceased List</h2>
          {deceasedList.map((deceased, index) => (
            <div key={index}>
              <p>Name: {deceased.name}</p>
              <p>Date of Death: {deceased.dateOfDeath}</p>
              <p>Photo: {deceased.photo?.name}</p>
              <button onClick={() => handleRemoveDeceased(index)}>
                Remove
              </button>
              <hr />
            </div>
          ))}
          <button onClick={handleSaveAllDeceased}>Save All</button>
        </div>
      )}
    </div>
  );
};
export default DeceasedDetails;
