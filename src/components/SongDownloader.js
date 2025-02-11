import React, { useState } from "react";
import { downloadSong } from "../services/downloaderService";
import "../styles/App.css";
import logo from "../assets/spotify-logo.jpg";

const SongDownloader = () => {
    const [songUrl, setSongUrl] = useState("");
    const [songDetails, setSongDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDownload = async () => {
        setError("");
        setLoading(true);

        try {
            const data = await downloadSong(songUrl);
            setSongDetails(data);
        } catch (err) {
            console.error("API Error:", err);
            setError("Error fetching song. Please enter a valid song URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="App Logo" className="logo" />
            <h1>Song Downloader</h1>

            <input
                type="text"
                placeholder="Enter Song URL"
                value={songUrl}
                onChange={(e) => setSongUrl(e.target.value)}
            />
            <button onClick={handleDownload} disabled={!songUrl || loading}>
                {loading ? "Downloading..." : "Download"}
            </button>

            {error && <p className="error">{error}</p>}

            {songDetails && (
                <div className="song-card">
                    <img src={songDetails.thumbnail} alt="Song Thumbnail" />
                    <h3>{songDetails.title}</h3>
                    <p>{songDetails.artist}</p>
                    <a href={songDetails.downloadLink} download={`${songDetails.title}.mp3`}>
                        <button className="download-btn">Download Now</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default SongDownloader;