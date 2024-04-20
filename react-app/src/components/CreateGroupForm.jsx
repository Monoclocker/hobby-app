import React, { useState } from "react";

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupType, setGroupType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ваша логика обработки отправки формы
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Создать новую группу
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700"
            >
              Название группы
            </label>
            <input
              type="text"
              id="groupName"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Введите название группы"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="groupDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Описание
            </label>
            <textarea
              id="groupDescription"
              rows="3"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Введите описание группы"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="groupType"
              className="block text-sm font-medium text-gray-700"
            >
              Тип группы
            </label>
            <select
              id="groupType"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
              required
            >
              <option value="">Выберите тип группы</option>
              <option value="public">Публичная</option>
              <option value="private">Приватная</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Создать группу
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;
