import http from "k6/http";
import { check, sleep } from "k6";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "signup-load.html": htmlReport(data),
    };
}

export const options = {
    vus: 1,
    duration: "1m",
};

export default () => {
    const url = "http://localhost:3000/api/register-ceps";

    const res = http.get(url);

    console.log(res.body);

    sleep(1);
};
