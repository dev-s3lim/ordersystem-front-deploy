<template>
  <v-card class="mx-auto" max-width="500" outlined>
    <v-card-title id="signup-title">
      회원가입
    </v-card-title>
    <v-card-text>
      <v-form>
        <!-- 이름 입력 필드 -->
        <v-text-field
          label="이름"
          variant="outlined"
          v-model="form.name"
          :rules="[v => !!v || '이름을 입력해주세요.']"
        />
        
        <!-- 이메일 입력 필드 -->
        <v-text-field
          label="이메일"
          variant="outlined"
          v-model="form.email"
          :rules="[v => !!v || '이메일을 입력해주세요.']"
        />
        
        <!-- 비밀번호 입력 필드 -->
        <v-text-field
          label="비밀번호"
          type="password"
          variant="outlined"
          v-model="form.password"
          :rules="[v => !!v || '비밀번호를 입력해주세요.']"
        />
        
        <!-- 회원가입 버튼 -->
        <v-btn color="orange">회원가입</v-btn>
        <v-btn color="red" @click="cancel()">취소</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <!-- v-dialog는 내부적으로 true/false값을 가지고 외부에 공개될지 말지 여부가 결정-->
  <v-dialog v-model="trueOrFalse" max-width="400px">
    <v-card>
        <v-card-title class="text-h6">정말 취소하시겠습니까?</v-card-title>
            <v-card-actions>
                <v-btn color="green" @click="resetModal()">네</v-btn>
                <v-btn color="red" @click="resetModal()">아니오</v-btn>
            </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
    export default {
        name: 'VuetifyComponent',
        data(){
            return{
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                trueOrFalse: false
            }
        },
        methods: {
            cancel() {
                this.trueOrFalse = true; // 다이얼로그를 열기 위해 true로 설정
            },
            resetModal() {
                this.trueOrFalse = false; // 다이얼로그를 닫기 위해 false로 설정
            }
        }
    }
</script>
<style scoped>
    #signup-title {
        text-align: center;
        margin-bottom: 20px;
        color: #000000;
        font-weight: bold;
        font-size: 30px;
    }
    .v-card {
        margin-top: 50px;
    }
</style>