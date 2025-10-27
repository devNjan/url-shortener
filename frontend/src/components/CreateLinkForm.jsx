import { useState } from "react";
import API from "../services/api";

const [longUrl, setLongUrl] = useState("");
const [shortUrl, setShortUrl] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/urls", { longUrl });
    setShortUrl(res.data.shortUrl);
    setError("");
  } catch (err) {
    setError("Error creating short URL");
    console.error(err);
  }
};

function CreateLinkForm() {
  return (
    <div>
      <h2>Shorten your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL..."
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          Short URL :{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateLinkForm;
