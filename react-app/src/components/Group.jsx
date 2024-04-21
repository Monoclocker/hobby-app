import React from 'react';
import { useState } from 'react';
import ModalGroup from './ModalGroup';

const Group = ({ id, name, isAdmin }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div key={id} className="bg-gray-100 rounded-lg p-4 mb-2 flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">
                    {name} {isAdmin ? '(Владелец)' : ''}
                </h3>
            </div>
            <button
                onClick={() => {
                    setModalOpen(!modalOpen);
                }}
                className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md"
            >
                Просмотреть
            </button>
            {modalOpen && (
                <ModalGroup modalOpen={modalOpen} isAdmin={isAdmin} idGroup={id} setModalOpen={setModalOpen} />
            )}
        </div>
    );
};

export default Group;
