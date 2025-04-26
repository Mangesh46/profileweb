import React from "react";

const ProfileCard = () => {
  return (
    <div
      style={{
        border: "none",
        padding: "2rem",
        borderRadius: "1rem",
        maxWidth: "360px",
        margin: "2rem auto",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/resume_photo.jpeg`}
        alt="Mangesh Sarde"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "50%",
          marginBottom: "1rem",
          border: "4px solid white",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />

      <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "#333" }}>
        Mangesh Sarde
      </h2>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1.5rem" }}>
        Web Developer | React Enthusiast
      </p>

      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
        📧 mangeshsarde6@gmail.com
      </p>

      <a
        href="https://github.com/Mangesh46"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Visit GitHub
      </a>
    </div>
  );
};

export default ProfileCard;
