
function FileFormats({ title, icon, formats }) {
  return (
    <div className="flex flex-col w-[full] items-center px-4 py-3 bg-white sm:w-[25%] shadow-sm rounded-lg hover:shadow-md border min-h-[250px]">
      <h3 className="text-xl font-semibold">{title}</h3>
      {icon}
      <div className="w-full text-center mt-4">
        <div className="grid grid-cols-3 gap-4 ">
          {formats.map((format, index) => (
            <span key={index} className="bg-blue-200 rounded py-1">
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileFormats;