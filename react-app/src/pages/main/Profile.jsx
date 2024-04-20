import React from "react";

const Profile = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-screen-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 w-full h-48 sm:h-64 flex items-center justify-center">
          <img
            src="profile-picture.jpg"
            alt="Profile Picture"
            className="w-1/2 h-1/2 sm:w-48 sm:h-48 rounded-full"
          />
        </div>
        <div className="px-6 py-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-4">
            John Doe
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
            New York, USA
          </p>
          <div className="border-t border-gray-300 py-4 sm:py-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              commodo ex eget mauris consequat, eget tincidunt quam tempor.
            </p>
          </div>
          <div className="border-t border-gray-300 py-4 sm:py-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Contact Information
            </h2>
            <ul className="text-base sm:text-lg text-gray-700">
              <li>Email: john@example.com</li>
              <li>Phone: +1234567890</li>
              <li>
                Website:{" "}
                <a href="https://example.com" className="text-blue-500">
                  example.com
                </a>
              </li>
            </ul>
          </div>
          <div className="border-t border-gray-300 py-4 sm:py-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Social Media
            </h2>
            <ul className="text-base sm:text-lg text-gray-700">
              <li>
                <a href="#" className="text-blue-500">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
