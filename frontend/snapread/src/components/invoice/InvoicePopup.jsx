import PropTypes from 'prop-types';

const InvoicePopup = ({ handleUpload, handleFileChange, setPopup, popup }) => {
  const handlePopup = () => {
    setPopup(!popup);
    console.log(popup);
  };

  return (
    <>
      {popup && (
        <div className=" flex w-full h-full absolute justify-center items-center bg-opacity-60 z-10 bg-gray-500 ">
          <div className="bg-white flex flex-col justify-center text-center p-5 rounded-lg">
            <div className="w-full flex justify-end">
              <button onClick={handlePopup} className="flex justify-end">
                <i className="fa-solid fa-x p-3"></i>
              </button>
            </div>
            <span className="p-3 text-slate-900 text-xl font-bold">
              Zeskanuj swoją fakturę
            </span>
            <input
              onChange={handleFileChange}
              className="p-3 m-3 border border-slate-300 rounded-lg bg-slate-200"
              type="file"
            />
            <button
              className="bg-green-500 p-3 m-3 text-white rounded-lg"
              onClick={handleUpload}
            >
              Dodaj fakturę
            </button>
          </div>
        </div>
      )}
    </>
  );
};

InvoicePopup.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  popup: PropTypes.bool.isRequired,
};

export default InvoicePopup;
