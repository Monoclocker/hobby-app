import React, { useState, useEffect } from 'react';
import RequestService from '../api/RequestService';
import { useNavigate } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';

const ModalGroup = ({ modalOpen, setModalOpen, idGroup, isAdmin }) => {
    const [username, setUsername] = useState('');
    const [listWithUsersGroup, setListWithUsersGroup] = useState([]);

    const navigate = useNavigate();
    const handleClickOutside = (e) => {
        if (e.target.classList.contains('bg-gray-800')) {
            setModalOpen(!modalOpen);
        }
    };

    const [logIn, isLoading, eventError] = useFetching(async () => {
        const response = await RequestService.getUsersFromGroup(idGroup);
        // console.log(response.data['participants']);
        setListWithUsersGroup([...response.data['participants']]);
    });

    useEffect(() => {
        logIn();
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    const handlerAddNewUser = async (e) => {
        e.preventDefault();
        try {
            await RequestService.addUserToGroup(idGroup, username);
        } catch (e) {
            if (e.response.status === 401) {
                await RequestService.refreshToken();
                navigate('/groups');
            }
        }
        window.location.reload();
    };
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white shadow-md rounded-lg p-8">
                <button
                    onClick={(e) => {
                        setModalOpen(!modalOpen);
                    }}
                    className="float-right text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
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
                <h2 className="text-xl font-semibold mb-4">Участники группы</h2>
                <ul className="mb-4">
                    {listWithUsersGroup.length === 0 ? (
                        <h1>Люди отсутствуют</h1>
                    ) : (
                        listWithUsersGroup.map((member, index) => <li key={index}>{member}</li>)
                    )}
                </ul>

                {isAdmin ? (
                    <form>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Имя пользователя"
                            className="appearance-none bg-gray-200 text-gray-700 border rounded py-2 px-3 mb-3 focus:outline-none"
                        />
                        <button
                            type="submit"
                            onClick={(e) => handlerAddNewUser(e)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Добавить участника
                        </button>
                    </form>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ModalGroup;
