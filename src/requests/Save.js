import { saveUrl } from "./Consts.js";
import axios from "axios";

export async function Save(login, password, time, slides, field) {
    const queryUrl = saveUrl();
    console.log(queryUrl);
    let params = { login: login, password: password, time: time, slides: slides, field: field.join(',') };
    const status = await axios
        .post(queryUrl, params)
        .then((response) => {
            console.log(response);
            return true;
        })
        .catch((response) => {
            console.log(response);
            return false;
        });
    return status;
}