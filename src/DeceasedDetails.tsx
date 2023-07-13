import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const DeceasedDetails: React.FC = () => {
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

    if (!name) {
      console.error("Missing value for 'fullname' field");
      return;
    }
    if (!photo) {
      console.error("No photo selected");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dateOfDeath", dateOfDeath);
    formData.append("photo", photo);

    try {
      await axios.post("http://localhost:5020/deceased", formData);
      setName("");
      setDateOfDeath("");
      setPhoto(null);
    } catch (error) {
      console.error("Error occurred while saving deceased details:", error);
    }
  };

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
    </div>
  );
};
export default DeceasedDetails;
