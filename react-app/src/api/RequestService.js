import axios from "axios";

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


}