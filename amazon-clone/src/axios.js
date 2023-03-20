import axios from "axios";

const instance = axios.create({
    baseURL: "https://127.0.0.1:5001/clone-e343f/us-central1/api"
});

export default instance;