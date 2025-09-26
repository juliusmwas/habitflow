import { IoIosLogOut } from "react-icons/io";

function LogoutPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
        <IoIosLogOut className="text-5xl text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Log Out</h1>
        <p className="text-gray-600 mb-6">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes, Log Out
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
