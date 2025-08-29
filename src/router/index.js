import { createRouter, createWebHistory } from "vue-router";
import { practiceRouter } from "./practiceRouter";
import { memberRouter } from "./memberRouter";
import { orderingRouter } from "./orderingRouter";
import { productRouter } from "./productRouter";

// routes = url경로와 화면을 Mapping하는 역할을 하는 파일
const routes = [
    ...practiceRouter, // Spread operator를 사용하여 practiceRouter의 내용을 포함
    ...memberRouter,
    ...orderingRouter,
    ...productRouter,
]
const router = createRouter(
    {
        // vue-router는 내부적으로 크게 2가지 종류가 있음
        // 1)createWebHistory() - HTML5 History 모드 <!-- 권장 -->
        // localhost:3000/member/create
        // 2)createWebHashHistory() - 해시 모드
        // localhost:3000/#/member/create
        history: createWebHistory(),
        routes
    }
)

// export된 router를 main.js에서 import 해줘야 함
export default router;