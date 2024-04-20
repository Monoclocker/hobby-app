import axios from 'axios';

let config = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
};
const url = 'http://194.87.102.174';

export default class RequestService {
    static async registration(userData) {
        console.log(userData);
        return await axios.post(url + '/Auth/Register', {
            ...userData,
        });
    }

    static async authorization(userData) {
        return await axios.post(url + '/Auth/Login', {
            ...userData,
        });
    }

    static async getUserData() {
        return await axios.get(url + '/Profiles/GetProfile', config);
    }

    static async getAllGroups() {
        return await axios.get(url + `/Group/GetAll`, config);
    }

    static async addUserToGroup(id, username) {
        return await axios.post(url + `/Group/Add/${id}`, { ...username });
    }

    static async removeUserFromGroup(id) {
        return await axios.post(url + `/Group/Remove/${id}`);
    }

    static async getUsersFromGroup(id) {
        return await axios.get(url + `/Group/GetParticipants/${id}`);
    }

    static async removeGroup(id) {
        return await axios.get(url + `/Group/Remove/${id}`);
    }

    static async createGroup(data) {
        return await axios.post(url + `/Group/Create`, { ...data }, config);
    }
}
