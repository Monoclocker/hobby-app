import React from "react";

const GroupList = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Мои группы
        </h2>
        <div className="mb-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-600">{group.description}</p>
              </div>
              <button
                className="text-blue-500 hover:text-blue-600"
                onClick={() => handleAddGroup(group)}
              >
                Присоединиться
              </button>
            </div>
          ))}
        </div>
        <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => handleAddGroup()}
        >
          Создать новую группу
        </button>
      </div>
    </div>
  );
};

export default GroupList;
