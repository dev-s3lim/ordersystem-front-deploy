<template>
    <h1>Hook 실습</h1>
    <button @click="moveScreen()">다른화면 이동</button>
    <h1>
        {{ count1 }}
    </h1>
    <button @click="count1++">카운트 증가</button>
    <!-- Computed 통해 계산된 함수의 결과값은 함수명 그대로 변수처럼 사용 가능-->
    <h1>computed된 값 : {{ doubleCount }}</h1>
</template>

<script>
    export default {
        name: 'HookComponent',
        data() {
            return {
                count1: 0,
            }
        },
        // 화면이 열리기 전 (vue instance가 생성되기전) 실행되는 함수
        // 목록조회 / 상세조회 / 상품등록 등 (axios.get, axios.post 등) 비동기 작업을 할 때 사용
        created() {
            /*
            alert('created 테스트');
            */
        },

        // 컴포넌트가 화면상에서 제거될 때 실행되는 함수
        beforeUnmount() {
            /*
            alert('화면종료');
            */
        },
        // Computed 속성은 종속된 데이터가 변경되었을 때 자동으로 다시 계산되는 속성입니다.
        // 값이 튀어나옴
        computed: {
            // 예시 : 장바구니 수량 보여줄 때 주로 사용
            doubleCount() {
                // this.count1이 변경되면, doubleCount가 자동으로 다시 계산된다.
                return this.count1 * 2;
            }
        },
        // "특정 변수값"의 변경사항을 인지하여 함수를 실행하는 hook 함수
        // 변화를 감지하여 특정 작업을 수행할 때 사용
        /*
        watch: {
            // 인지하고자 하는 변수값과 일치되는 함수명 사용
            // 사용 예시 : 검색어 입력시 자동 api 호출
            count1(){
                alert('watch 함수 실행');
            }
        },
        */
        // "화면 전체"의 변경 사항을 인지하는 hook 함수
        updated() {
            alert('updated 함수 호출');
        },
        methods: {
            moveScreen() {
                this.$router.push({ name: 'VuetifyComponent' });
            }
        }
    }
</script>