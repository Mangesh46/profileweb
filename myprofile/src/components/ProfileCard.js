import React, { useState } from "react";

const ProfileCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    interest: "",
    feedback: "",
    offer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        border: "none",
        padding: "2rem",
        borderRadius: "1rem",
        maxWidth: "400px",
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
        mangeshsarde6@gmail.com
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
          marginBottom: "2rem",
        }}
      >
        Visit GitHub
      </a>

      <h3 style={{ marginTop: "2rem", fontSize: "1.4rem", color: "#333" }}>
        Send Feedback / Offer
      </h3>

      <form
        action="https://formsubmit.co/sardemangesh3@gmail.com"
        method="POST"
        style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          style={{
            padding: "0.8rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="interest"
          placeholder="Your Interest (e.g., Frontend Dev, UI/UX, Internship)"
          required
          value={formData.interest}
          onChange={handleChange}
          style={{
            padding: "0.8rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          required
          value={formData.feedback}
          onChange={handleChange}
          rows="4"
          style={{
            padding: "0.8rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="offer"
          placeholder="Offer Details (Company Name, Role, etc.)"
          value={formData.offer}
          onChange={handleChange}
          rows="3"
          style={{
            padding: "0.8rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />

        {/* Hide extra fields */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://Mangesh46.github.io/myprofile/thankyou.html" />

        <button
          type="submit"
          style={{
            padding: "0.8rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "30px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
