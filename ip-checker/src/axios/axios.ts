import axios from "axios";
import {ElMessage} from "element-plus";

const configInstance = {
    baseURL: "/api"
}

const api = axios.create(configInstance);

api.interceptors.response.use(
    (response) => {
        if (response.data.status === 'fail') {
            ElMessage({
                type: 'error',
                message: `${response.data.status}: ${response.data.message} for query "${response.data.query}"`
            })
        }
        return response;
    }
);


export default api;
