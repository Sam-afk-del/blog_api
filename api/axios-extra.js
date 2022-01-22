import axios from 'axios'
import store from '../vuex/store'
import router from '../router'

let instance = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.token = localStorage.getItem('Authorization');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

// http response 拦截器
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    alert("长时间未活动掉线了，请重新登录");
                    store.dispatch('setExit');
                    router.push('/admin/login');
                    break;
                // case 404:
                //     router.push('*');
                //     break;
                // case 500:
                //     router.push('/500');
                //     break;
                // default:
                //     router.push('/500');
            }
        }
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    });

export default instance;