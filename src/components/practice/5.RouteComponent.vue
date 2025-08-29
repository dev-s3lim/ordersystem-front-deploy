<template>
    <!-- href 방식은 새로고침 되므로, 사용자 경험과 성능이 떨어짐 -->
    <v-btn href="/practice/route2">일반 라우팅</v-btn>
    <v-btn @click="hrefRouting()">일반 라우팅 (함수)</v-btn>

    <!-- 새롭게 라우트되는 컴포넌트만 created되고, 기존 컴포넌트는 created되지 않음 -->
    <!-- 화면상의 모든 컴포넌트가 새롭게 created 된다. -->
    <v-btn :to="'/practice/route2'">SPA 경로 기반 라우팅</v-btn>
    <v-btn @click="spaRouting1()">SPA 경로 기반 라우팅 (함수)</v-btn>

    <v-btn :to="{ name: 'RouteComponent2' }">SPA 이름 기반 라우팅</v-btn>
    <v-btn @click="spaRouting2()">SPA 이름 기반 라우팅 (함수)</v-btn>

    <v-btn :to="'/practice/route3/1'">게시글 1번 보기</v-btn>
    <v-btn @click="goToPost(1)">게시글 1번 보기</v-btn>
</template>
<script>
export default {
    name: 'RouteComponent',
    data() {
        return {
        }
    },
    methods: {
        // 여기에 필요한 메소드들을 추가할 수 있습니다.
        hrefRounting() {
            window.location.href = "/practice/route2";
        }
        , spaRouting1() {
            // spa 는 single page application 의 약자로, 새로고침 없이 페이지가 로드된다.
            this.$router.push("/practice/route2");
        }
        , spaRouting2() {
            // spa 는 single page application 의 약자로, 새로고침 없이 페이지가 로드된다.
            this.$router.push({ name: 'RouteComponent2' });
        }
        , goToPost(postId) {
            this.$router.push(`/practice/route3/${postId}`); // 1번 게시글로 이동
        }
    },
}
</script>