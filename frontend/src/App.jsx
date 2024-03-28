import { useState } from "react";
import axios from "axios";

function App() {
  const [video, setVideo] = useState(null);
  const [format, setFormat] = useState("mp4");
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", video);
    formData.append("format", format);
    try {
      const response = await axios.post(
        "http://localhost:5567/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Set response type to blob
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType && contentType.startsWith("video")) {
        const downloadUrl = URL.createObjectURL(response.data);
        setDownloadLink(downloadUrl);
      } else {
        console.log("Invalid response content type:", contentType);
      }
    } catch (error) {
      console.log("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <label htmlFor="format">Format</label>
        <select
          name="format"
          onChange={(e) => setFormat(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
        >
          <option value="mov">mov</option>
          <option value="mp3">mp3</option>
          <option value="wmv">wmv</option>
          <option value="WebM">WebM</option>
          <option value="mp4">mp4</option>
          <option value="avi">avi</option>
          <option value="mkv">mkv</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block mb-2 font-medium">
          Upload
        </label>
        <input
          type="file"
          name="file"
          onChange={(e) => setVideo(e.target.files[0])}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        onClick={handleUpload}
      >
        {loading ? "Converting" : "Convert"}
      </button>
      {downloadLink && (
        <a href={downloadLink} className="bg-indigo" download>
          Download
        </a>
      )}
    </div>
  );
}

export default App;
