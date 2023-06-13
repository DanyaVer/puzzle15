import { serverUrl } from "./Consts.js";
import axios from "axios";

async function Load(login, password) {
    const queryUrl = serverUrl + `/api/savings/${login},${password}`;
    fetch(queryUrl)
        .then(response => console.log(response.json()))
        .then(data => console.log(data));

    // const requestOptions = {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     // body: JSON.stringify({ title: "Vue POST Request Example" })
    // };
    // fetch(queryUrl)
    //     .then(response => response.json())
    //     .then(data => (this.postId = data.id));


    // console.log(queryUrl);
    // axios
    //     .get(queryUrl)
    //     .then((response) => {
    //         console.log(response);
    //         return { time: response.data.time, slides: response.data.slides, field: response.data.field };
    //     })
    //     .catch((response) => console.log(response));
}

export { Load }