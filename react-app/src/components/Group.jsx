import React from 'react';

const Group = () => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{group.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                <div className="border-t border-gray-300 py-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Участники</h3>
                    <ul className="text-sm text-gray-600">
                        {group.members.map((member) => (
                            <li key={member.id}>{member.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="border-t border-gray-300 py-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Приглашения</h3>
                    <ul className="text-sm text-gray-600">
                        {group.invitations.map((invitation) => (
                            <li key={invitation.id}>{invitation.email}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Group;
