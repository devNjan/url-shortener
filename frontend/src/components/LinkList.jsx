import { useState, useEffect } from "react";
import API from "../services/api";

function LinkList() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await API.get("/urls");
        setUrls(res.data);
      } catch (err) {
        console.error("Error fetching URLs", err);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Your Shortened Links</h2>
      {urls.length === 0 ? (
        <p>No links yet. Create one above!</p>
      ) : (
        <table
          style={{
            margin: "20px auto",
            borderCollapse: "collapse",
            width: "80%",
          }}
        >
          <thead>
            <tr style={{ background: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Original URL
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Short URL
              </th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    wordBreak: "break-all",
                  }}
                >
                  <a
                    href={url.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.longUrl}
                  </a>
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LinkList;
