<template>
  <div>
    <!-- 화면 내에서는 this. 를 붙일 필요 없음 -->
    <h1>Hello World, {{language}}</h1>
    <!-- v-model 문법을 사용하면 양방향 데이터 바인딩. 새로고침 필요없음 -->
    <input type="text" v-model="value"> <!-- v-model은 입력받는 값, 또는 상황에서만 설정 가능 -->
    <button @click="changeValue()">변수변경</button>
    <button @click="showValue()">변수확인</button>
  </div>
</template>

<script>
export default {
  //data()함수는 화면에서 사용할 변수를 정의한다.
  data(){
    return {
      language: "Java",
      value: "Java"
    }
  },

  // 개발자가 정의하는 함수는 methods안에 정의
  methods: {
    changeValue() {
      // this는 현재 컴포넌트 객체 자신을 의미한다. (Component 내부에 선언된 변수에 접근할 때 주로 사용)
      this.language = "C++";
    },
    showValue() {
      alert(this.value);
    }
  }
}
</script>
