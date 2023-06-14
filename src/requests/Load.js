import { serverUrl } from "./Consts.js";
import axios from "axios";

export async function Load(login, password, field) {
    const queryUrl = serverUrl + `/api/savings/${login}/${password}`;
    console.log(queryUrl);
    const res = await axios
        .get(queryUrl)
        .then(response => {
            console.log(response);
            const fieldOfString = response.data.field.split(',');
            const fieldOfNum = fieldOfString.map(element => {
                return Number(element);
            });

            const slides = Number(response.data.slides);
            const time = Number(response.data.time);

            return { time: time, slides: slides, field: fieldOfNum };
        })
        .catch(response => console.log(response));
    return res;
}