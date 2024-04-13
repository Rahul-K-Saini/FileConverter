
function FileFormats({ title, icon, formats }) {
  return (
    <div className="flex flex-col w-[full] items-center p-6  bg-white sm:w-[25%] shadow-sm rounded-lg hover:shadow-md border min-h-[280px]">
      <h3 className="text-xl mb-2 font-semibold">{title}</h3>
      {icon}
      <div className="w-full text-center mt-6">
        <div className="grid grid-cols-3 gap-4 ">
          {formats.map((format, index) => (
            <span key={index} className={`${format=="MP3" ? "text-red-500 font-semibold":"text-gray-900"} bg-blue-300 rounded py-1 hover:bg-blue-200`}>
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileFormats;