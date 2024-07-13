import downloadIcon from "../assets/icons/download.svg";

const HeaderReports = () => {
  return (
    <div className="h-20 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">Reports</div>
      <div className="flex items-center cursor-pointer">
        <img src={downloadIcon} alt="" />
        <span className="text-sm font-semibold">Download</span>
      </div>
    </div>
  );
};

export default HeaderReports;
