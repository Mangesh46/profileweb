import React from "react";

const ProfileCard = () => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      maxWidth: "400px",
      margin: "auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <img
        src="https://via.placeholder.com/150"
        alt="Mangesh Sarde"
        style={{ borderRadius: "50%", marginBottom: "1rem" }}
      />
      <h2>Mangesh Sarde</h2>
      <p>Web Developer | React Enthusiast</p>
      <p>Email: mangesh@example.com</p>
      <a
        href="https://github.com/Mangesh46"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#007bff", textDecoration: "none" }}
      >
        GitHub Profile
      </a>
    </div>
  );
};

export default ProfileCard;
