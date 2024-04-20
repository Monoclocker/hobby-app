import axios from 'axios';

let config = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
};
const url = 'http://194.87.102.174';

export default class RequestService {
    static async registration(userData) {
<<<<<<< HEAD
        return await axios.post(url + '/Auth/Register', {
            ...userData,
=======
        return await axios.post(url + "/Auth/Register", {
          ...userData
>>>>>>> 5afd8c7cda7c06de0f2c7bac1c602ad8f3b5e15b
        });
    }

    static async refreshToken() {
        const response = await axios.post(url + '/Auth/Refresh', {
            refreshToken: localStorage.getItem('refreshToken'),
        });
        localStorage.setItem('accessToken', response.data['accessToken']);
        console.log(response.data['accessToken']);
        localStorage.setItem('refreshToken', response.data['refreshToken']);
        config = {
            headers: {
                Authorization:  "Bearer " + localStorage.getItem("accessToken"),
            }
        }
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

    static async updateProfile(data) {
        return await axios.post(url + `/Profiles/UpdateProfile`, { ...data }, config);
    }
}
