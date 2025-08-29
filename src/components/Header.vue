<template>
  <v-app-bar>
    <v-container>
      <v-row>
        <v-col class="d-flex justify-start">
          <div v-if="userRole === 'ADMIN'">
            <v-btn :to="'/member/list'">회원관리</v-btn>
            <v-btn :to="'/product/manage'">상품관리</v-btn>
            <v-btn :href="'/ordering/list'">실시간 주문건수 {{ liveOrderCount }}</v-btn>
            <!--<v-btn :to="'/practice/store'">Store Test</v-btn>-->
          </div>
        </v-col>
        <v-col class="text-center">
          <v-btn :to="'/'">DEVOPS AUTOMATION SHOP</v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
            <v-btn :to="'/ordering/cart'">장바구니 {{ totalQuantity }}</v-btn>
            <v-btn :to="'/product/list'">상품목록</v-btn>
            <v-btn v-if ="isLoggedin" :to="'/member/myInfo'">마이페이지</v-btn>
            <v-btn v-if ="!isLoggedin" :to="'/member/create'">회원가입</v-btn>
            <v-btn v-if ="!isLoggedin" :to="'/member/login'">로그인</v-btn>
            <v-btn v-if ="isLoggedin" @click="doLogout()">로그아웃</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      userRole: null,
      isLoggedin: false,
      liveOrderCount: 0,
    };
  },
  created() { // 로그인 후, 헤더의 상태를 업데이트
    const accessToken = localStorage.getItem("accessToken"); // ADMIN 일 경우, 토큰의 payload를 분해 후, role을 꺼내봄 
    // (jwt를 파싱할 수 있는 tool 필요)
    if (accessToken) {
      const payload = jwtDecode(accessToken);
      console.log(payload);
      this.userRole = payload.role;
      this.isLoggedin = true;
    }
        // sse 연결 및 메시지 수신
        if(this.userRole === 'ADMIN') {
            // sse연결 요청을 위한 event-source-polyfill라이브러리 사용
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                });
            
                sse.addEventListener('connect', (event) => {
                    console.log(event);
                });

                sse.addEventListener('ordered', (event) => {
                    console.log(event);
                    this.liveOrderCount++;
                });
        }
    },
  computed: {
    totalQuantity() {
      return this.$store.getters.getTotalQuantity;
    }
  },
  name: 'AppHeader',
  methods: {
    doLogout() { // 로그아웃 처리
      localStorage.clear(); // AT와 RT를 서버에 모두 삭제해달라고 보내는 요청 (로컬 스토리지를 비움)
      this.isLoggedin = false; // 로컬 스토리지에 저장된 토큰을 삭제했으므로, isLoggedin 상태를 false로 변경
      this.userRole = null; // 사용자 역할 초기화
      this.$router.push("/"); // 로그아웃 후, 홈으로 이동
      // 백엔드에서 변수 추가 시 추가적으로 초기화 (null) 필요
    }
  },
}
</script>
