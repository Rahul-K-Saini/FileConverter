import { Images, Video, MusicNotes } from "@phosphor-icons/react";
import FileFormats from "../components/FileFormats";
function About() {

  const imageFormats = ["PNG", "JPEG", "GIF", "BMP","TIFF","BMP"];
  const videoFormats = ["MP4", "MOV", "AVI", "MKV","MP3"];
  const audioFormats = ["Mp3", "FLAC", "WEBM", "M4A", "WAV", "WMA"];

  return (
    <div className="w-[90%] m-auto">
      <h2 className="text-4xl font-semibold text-blue-800">
        A Fast and Free File Format Converter.
      </h2>
      <p className="antialiased text-lg mt-2">
        Hi, This website allows you to convert any image, audio and video format
        to another format in a fast and easy way, 
        <span className="text-blue-500">  You can also Convert Video to Audio.</span> 
      </p>
      <div className="flex sm:justify-between sm:flex-row mt-8 flex-col gap-6">
        <FileFormats title="Images" icon={<Images size={64}/>} formats={imageFormats} />
        <FileFormats title="Video" icon={<Video size={64}/>} formats={videoFormats} />
        <FileFormats title="Audio" icon={<MusicNotes size={64}/>} formats={audioFormats} />
      </div>
    </div>
  );
}

export default About;