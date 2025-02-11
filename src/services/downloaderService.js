import axios from "axios";


export const downloadSong = async (songUrl) => {
    // Extract trackId from the full Spotify URL
    const trackId = songUrl.split("track/")[1]?.split("?")[0];

    if (!trackId) {
        throw new Error("Invalid Spotify song URL.");
    }

    const options = {
        method: "GET",
        url: "https://spotify-downloader9.p.rapidapi.com/downloadSong",
        params: {
            songId: trackId, // Pass the extracted trackId
        },
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        console.log("API Response:", response.data); // Log the response for debugging
        return response.data.data; // Returns song details and download link
    } catch (error) {
        console.error("Error fetching song:", error);
        throw error;
    }
};