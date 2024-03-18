import axios from "axios";
import modalDeleteIcon from "../assets/delete-red.svg";

const ModalDelete = ({ id, onClose }) => {
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/member/${id}`); // Assuming your delete endpoint is configured correctly
      console.log("Item deleted successfully");
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div onSubmit={(e) => e.preventDefault()}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blue-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="modal-content bg-white p-2 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-2 text-xl pt-3 font-bold">Confirm Deletion</div>
        <img src={modalDeleteIcon} alt="Delete Icon" className="h-11 w-11 mx-auto mb-4" />
        <p className="text-center mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-center items-center">
          <button
            type="summit"
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-200"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
