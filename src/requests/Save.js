import { serverUrl } from "./Consts.js";
import axios from "axios";

async function Save(login, password, field) {
    const queryUrl = serverUrl + "/api/savings";
    console.log(queryUrl);
    let params = { login: login, password: password, time: field.time, slides: field.slides, field: field.field.join(',') };
    axios
        .post(queryUrl, params)
        .then((response) => {
            console.log(response);
            return true;
        })
        .catch((response) => {
            console.log(response);
            return false;
        });
}

export { Save }