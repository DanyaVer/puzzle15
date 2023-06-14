import { serverUrl } from "./Consts.js";
import axios from "axios";

export async function Save(login, password, time, field) {
    const queryUrl = serverUrl + "/api/savings";
    console.log(queryUrl);
    let params = { login: login, password: password, time: time, slides: field.slidesNumber, field: field.cells.join(',') };
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