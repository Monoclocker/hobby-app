import axios from "axios";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("accessToken");

export default class RequestService {

    static async registration(userData) {
        return await axios.post("http://194.87.102.174/Auth/Register", {
          ...userData,
        });
    }

    static async authorization(userData) {
        return await axios.post("http://194.87.102.174/Auth/Login", {
            ...userData,
        })
    }

    static async getUserData(userData) {
        return await axios.post("http://194.87.102.174/Auth/Login", {
            ...userData,
        })
    }

    static async getAllGroups() {
        return await axios.get(`http://194.87.102.174/Group/GetAll`)
    }

    static async addUserToGroup(id, username) {
        return await axios.post(`http://194.87.102.174/Group/Add/${id}`, {...username})
    }

    static async removeUserFromGroup(id) {
        return await axios.post(`http://194.87.102.174/Group/Remove/${id}`)
    }

    static async getUsersFromGroup(id) {
        return await axios.get(`http://194.87.102.174/Group/GetParticipants/${id}`)
    }

    static async removeGroup(id) {
        return await axios.get(`http://194.87.102.174/Group/Remove/${id}`)
    }

    static async createGroup(data) {
        return await axios.post(`http://194.87.102.174/Group/Create`, {...data})
    }

}