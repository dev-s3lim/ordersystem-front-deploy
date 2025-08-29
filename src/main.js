import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import axios from 'axios';
import store from './store'; // Import the store
const app = createApp(App);

axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        // 에러가 발생시, 사용자의 본래요청의 화면으로 되돌아가야함
        return Promise.reject(error);
    }
)

// 모든 axios요청에서 401을 받을경우에 interceptor를 통해 rt를 통한 at 재발급
// rt마저 만료되었을때는 login창으로 이동
axios.interceptors.response.use(
    response => response,
    async error => {
        if(error.response && error.response.status === 401 ){
            try{
                console.log("heeer")
                const refreshToken = localStorage.getItem('refreshToken');
                const response =  await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-at`, {refreshToken});
                const accessToken = response.data.result.accessToken;
                localStorage.setItem("accessToken", accessToken);
                console.log("갱신 성공")
                window.location.reload();
            }catch(e){
                console.log("갱신 실패", e);
                localStorage.clear();
                window.location.href = "/member/login";
            }
        }
        return Promise.reject(error);
    }
)

app.use(vuetify);
app.use(router);
app.use(store); // Use the store
app.mount('#app');
