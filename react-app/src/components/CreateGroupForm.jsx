import React, { useState, useEffect } from 'react';
import RequestService from '../api/RequestService';

const CreateGroupForm = ({ modalOpen, setModalOpen }) => {
    const [groupName, setGroupName] = useState('');

    const handleClickOutside = (e) => {
        if (e.target.classList.contains('bg-gray-800')) {
            setModalOpen(!modalOpen);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        await RequestService.createGroup({ groupName: groupName });
        setModalOpen(!modalOpen);
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
                <form>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Название группы"
                        className="appearance-none bg-gray-200 text-gray-700 border rounded py-2 px-3 mb-3 focus:outline-none"
                    />
                    <button
                        type="submit"
                        onClick={(e) => handleCreateGroup(e)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                        Создать
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupForm;
