import React from 'react';

const Group = ({ id, name }) => {
    return (
        <div key={id} className="bg-gray-100 rounded-lg p-4 mb-2 flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            </div>
            <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md">Просмотреть</button>
        </div>
    );
};

export default Group;
