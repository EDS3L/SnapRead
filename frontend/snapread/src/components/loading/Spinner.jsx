import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";
import { useState } from "react";

const override = {
  display: "flex",
  margin: "100px auto",
};

const Spinner = ({ loading, messageA, messageB }) => {
  const [displayText, setDisplayText] = useState(messageA);

  const setText = (messageB) => {
    if (messageB) {
      setTimeout(() => {
        setDisplayText(messageB);
      }, 4000);
    }
  };

  return (
    <div className="absolute bg-white bg-opacity-60 z-50 h-full w-full flex items-center justify-center">
      <div className="flex-col justify-center align-middle text-center">
        <p onChange={setText(messageB)} className="flex-grow text-3xl">
          {displayText}
        </p>
        <ClipLoader
          color="#4338ca"
          loading={loading}
          cssOverride={override}
          size={250}
        />
      </div>
      {/* dodać tekst pod spinnerze */}
    </div>
  );
};

Spinner.propTypes = {
  loading: PropTypes.string.isRequired,
  messageA: PropTypes.string.isRequired,
  messageB: PropTypes.string,
};

export default Spinner;
