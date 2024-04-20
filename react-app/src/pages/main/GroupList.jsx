import React from 'react';
import { useState, useEffect } from 'react';
import RequestService from '../../api/RequestService';
import { useFetching } from '../../hooks/useFetching.js';
import CreateGroupForm from '../../components/CreateGroupForm.jsx';
import Group from '../../components/Group.jsx';

const GroupList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [listGroups, setListGroups] = useState([]);

    const [logIn, isLoading, eventError] = useFetching(async () => {
        const response = await RequestService.getAllGroups();
        setListGroups([...response.data]);
    });

    useEffect(() => {
        logIn();
    }, []);

    return (
        <div className="max-w-prose mx-auto p-6 my-8 backdrop-opacity-50 rounded-lg shadow-md shadow-indigo-500/50 overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Мои группы</h2>
                {listGroups.length === 0 ? (
                    <p className=" text-sky-900 font-bold text-center p-4">У вас пока нет созданных групп.</p>
                ) : (
                    <div className="mb-4">
                        {listGroups.map((group) => (
                            <Group key={group.id} id={group.id} name={group.groupName} />
                        ))}
                    </div>
                )}
                <button
                    onClick={() => {
                        setModalOpen(!modalOpen);
                    }}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-100 bg-indigo-800 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Создать новую группу
                </button>
                {modalOpen && <CreateGroupForm modalOpen={modalOpen} setModalOpen={setModalOpen} />}
            </div>
        </div>
    );
};

export default GroupList;
