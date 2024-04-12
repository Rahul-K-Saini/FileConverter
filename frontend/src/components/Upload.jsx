import React, { useState } from "react";
import { Video, ImageSquare, X } from "@phosphor-icons/react";
import loadingImage from "../assets/1.gif";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    toast(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    try {
      const response = await axios.post(
        "http://localhost:5567/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      console.log(response);
      const contentType = response.headers["content-type"];
      if (
        contentType &&
        (contentType.startsWith("audio") ||
          contentType.startsWith("video") ||
          contentType.startsWith("image"))
      ) {
        const downloadUrl = URL.createObjectURL(response.data);
        setDownloadLink(downloadUrl);
        setConverted(true);
      } else {
      toast.error("Something Went Wrong!");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setFormat("");
    setDownloadLink(null);
    setLoading(false);
    toast.error(null);
    setConverted(false);
  };

  return (
    <div>
      <ToastContainer/>
      {file === null ? (
        <div className="flex justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white  hover:bg-gray-100  "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-42 h-14 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-2xl text-center text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-4 py-6  border-2 rounded-lg border-gray-300 ">
            <div className="font-semibold">
              {file.type.split("/")[0] == "video" ? (
                <Video className="inline mr-2" size={32} />
              ) : (
                <ImageSquare className="inline mr-2" size={32} />
              )}
              {file.name.length <= 10
                ? file.name
                : file.name.slice(0, 8) + "..." + file.name.slice(-8)}
              <small className="text-gray-500 font-light">
                {" "}
                ({Math.floor(file.size / 1024)} KB)
              </small>
            </div>
            {loading ? (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Converting{" "}
                <img
                  src={loadingImage}
                  width={16}
                  height={16}
                  className="inline-block"
                />
              </span>
            ) : (
              <>
                {!converted ? (
                  <div className="text-gray-500 relative">
                    Convert to
                    <select
                      className="py-2 px-4 ml-2 border border-gray-300 rounded-md appearance-none"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                    >
                      <option value="">Select format</option>
                      {file.type.split("/")[0] === "video" ? (
                        <>
                          <option value="mov">MOV</option>
                          <option value="mp4">MP4</option>
                          <option value="avi">AVI</option>
                        </>
                      ) : file.type.split("/")[0] === "audio" ? (
                        <>
                          <option value="mp3">Mp3</option>
                          <option value="flac">Flac</option>
                          <option value="m4a">M4a</option>
                          <option value="webm">Webm</option>
                          <option value="wav">WAV</option>
                          <option value="wma">WMA</option>
                        </>
                      ) : (
                        <>
                          <option value="png">PNG</option>
                          <option value="jpeg">JPEG</option>
                          <option value="bmp">BMP</option>
                          <option value="gif">GIF</option>
                        </>
                      )}
                    </select>
                  </div>
                ) : (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Converted
                  </span>
                )}
              </>
            )}
            <button onClick={resetState}>
              <X className="text-red-400" size={32} />
            </button>
          </div>
          {converted ? (
            <div className="flex mt-2 w-[170px] flex-col gap-3 float-right">
              <button className="text-gray-50 rounded bg-gray-600 py-2 transition-colors duration-300">
                {downloadLink && (
                  <a href={downloadLink} className="bg-indigo" download>
                    Download
                  </a>
                )}
              </button>

              <button
                className="text-gray-800 bg-gray-200 rounded border py-2 transition-colors duration-300"
                onClick={resetState}
              >
                Convert Another File
              </button>
            </div>
          ) : (
            <button
              className={`float-right ${
                loading || format == "" ? "opacity-75 cursor-not-allowed" : ""
              }
               bg-blue-600 w-32 max-w-[150px] mt-5  text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300`}
              onClick={handleUpload}
              disabled={loading || format == ""}
            >
              {loading ? (
                <>
                  Converting
                  <img
                    src={loadingImage}
                    className="inline-block"
                    width={"15px"}
                    height={"15px"}
                  />
                </>
              ) : (
                "Convert"
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Upload;
