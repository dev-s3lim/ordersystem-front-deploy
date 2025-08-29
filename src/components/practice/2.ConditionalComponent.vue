<template>
    <h1>
        Vue 조건식
    </h1>
    <button v-if="!isLoggedIn" @click="login()">LOGIN</button>
    <button v-if="isLoggedIn" @click="logout()">LOGOUT</button>
    <div v-if="!isLoggedIn">
        Login 해주세요.
    </div>
    <div v-if="isLoggedIn">
        환영합니다.
    </div>

    <h1 v-if="isLoggedIn">
        상품 목록 조회
    </h1>
        <table v-if="isLoggedIn">
            <thead>
                <tr>
                    <th>
                        상품 ID
                    </th>
                    <th>
                        상품명
                    </th>
                    <th>
                        가격
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in productList" :key="product.id">
                    <td>
                        {{ product.id }}
                    </td>
                    <td>
                        {{ product.name }}
                    </td>
                    <td>
                        {{ product.price }}
                    </td>
                </tr>
            </tbody>
        </table>
</template>

<script>
import axios from 'axios';

    export default{
        name: 'ConditionalComponent',
        data() {
            return {
                isLoggedIn: false,
                productList: [
                    /*
                    { id: 1, name: "사과", price: 1000 },
                    { id: 2, name: "바나나", price: 2000 },
                    { id: 3, name: "체리", price: 3000 }
                     */

                ]
            }
        },
        // 화면이 열림과 동시에 실행되는 hook 함수
        async created() {
            // axios 사용 시 에러가 발생할 수 있으므로 try-catch로 감싸는 것이 좋음
            const response = await axios.get('http://localhost:8080/product/list');
            console.log(response.data);
            this.productList = response.data.result.content; // CommonDto 확인 필요 (백엔드 변수명 그대로 사용 필수, .data는 axios의 기본 설정)
        },
        methods: {
            login() {
                this.isLoggedIn = true;
            },
            logout() {
                this.isLoggedIn = false;
            }
        }
    }
</script>