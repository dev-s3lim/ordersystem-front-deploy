<template>
  <div>일반 라우팅 3 - postId: {{ id }}</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RouteComponent',
  data() {
    return {
      id: null,
    };
  },
  created() {
    // router에서 전달된 postId 값을 컴포넌트 상태로 저장
    this.id = this.$route.params.postId;
    const response = axios.get("http://localhost:8080/post/detail/" + this.id);
    console.log(response.data);
  },
};
</script>
