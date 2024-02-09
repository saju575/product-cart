/* eslint-disable react/prop-types */

const ConfirmModal = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      {/* <!-- Modal --> */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
        <div className="flex  justify-end  mb-2">
          <button
            onClick={() => onClose()}
            className=" p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* <!-- Checkmark and message --> */}
        <div className="flex flex-col items-center justify-center mb-6">
          <svg
            className="w-16 h-16 text-green-500 mr-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p className="text-lg text-gray-800 ">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
