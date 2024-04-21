import React, {useEffect, useState} from "react";
import MyModal from "../../components/UI/modal/MyModal.jsx";
import {useFetching} from "../../hooks/useFetching.js";
import RequestService from "../../api/RequestService.js";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [profileFirstModalVisible, setProfileFirstModalVisible] = useState(false);
    const [profileData, setProfileData] = useState({});

    const [fetchData, isDataLoading, dataError] = useFetching(async () => {
        try {
            const response = await RequestService.getUserData();
                if (response.status === 200) {
                    console.log(localStorage.getItem('accessToken'), 'aye');
                    console.log(response.data);
                    setProfileData(response.data);
                    localStorage.setItem('img', profileData['photo'])
                }
        } catch (e) {
            if (e.response.status === 401) {
                await RequestService.refreshToken();
            } else {
                console.log(e)
                alert('Сервис временно недоступен :(')
                navigate("/login");
            }
        }
    });

    useEffect(() => {
        fetchData();
    }, []);


  return (<div className="container mx-auto p-4">
          {isDataLoading ? <h1>Идёт загрузка...</h1> :
          <div className="max-w-screen-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <MyModal firstVisible={profileFirstModalVisible} setFirstVisible={setProfileFirstModalVisible}
                   children={profileData}>
                </MyModal>
              <div className="bg-gray-900 w-full h-48 sm:h-64 flex items-center justify-center">
                  <img
                      src={profileData['photo']}
                      alt="Profile Picture"
                      className="w-1/2 h-1/2 sm:w-48 sm:h-48 rounded-full"
                  />
              </div>
              <div className="px-6 py-8">
                  <div>
                      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-4">{profileData['username']}</h1>

                      <button onClick={() => setProfileFirstModalVisible(true)}
                              className="bg-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                          Редактировать профиль
                      </button>
                  </div>

                  <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                      {profileData['cityName']}, {profileData['age']}
                  </p>

                  <div className="border-t border-gray-300 py-4 sm:py-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
                          Обо мне
                      </h2>
                      <p className="text-base sm:text-lg text-gray-700">
                          {profileData['about']}
                      </p>

                  </div>
                  <div className="border-t border-gray-300 py-4 sm:py-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
                          Я ещё и здесь
                      </h2>
                      <ul className="text-base sm:text-lg text-gray-700">
                          <li>
                              {profileData['links'] ? profileData['links'].map((link) => (
                                  <a href={link}>{link + ' '}</a>
                              )) : "**Может быть тут что-то будет 🙃**"}
                          </li>
                      </ul>
                  </div>
                  <div className="border-t border-gray-300 py-4 sm:py-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
                          Мои интересы ✍️
                      </h2>
                      <p className="text-base sm:text-lg text-gray-700">
                          {profileData['interests'] ? profileData['interests'].map((text) => (
                                  <div className="text-lg font-semibold sm:mb-4 text-gray-800">{text + " "}</div>
                              )) : "**Может быть тут что-то будет 🙃**"}
                      </p>

                  </div>
              </div>
          </div>
          }
      </div>

  );
};

export default Profile;
