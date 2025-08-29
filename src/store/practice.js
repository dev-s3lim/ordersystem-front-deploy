function initState(){
    return {
        count: 0
    }
}

// 상태 유효 범위화 리셋 시점 :
// 리셋 시점 -> 페이지 새로고침, 브라우저 종료시
// 유효 시점 -> SPA 라우팅 시
export const practice = {
    // 상태 초기화
    state: initState,
    // 상태값 변경 메서드
    mutations : {
        incrementCount(state){
            state.count++;
        }
    },
    // component에서 mutation을 직접 호출하기 보다는, actions를 통해서 mutation을 호출하는 것이 좋다.
    // 여러개의 함수를 한번에 묶어서 호출할 수 도 있기 때문에 (공통화)
    actions : {
        incrementCount(context){
            // vuex에서 actions를 통해서 mutation을 호출할 때는  commit함수 사용
            // 아래와 같은 구조는 여러 mutation의 조합을 actions에서 호출할 수 있다.
            context.commit('incrementCount');
        }
    },
    // 상태값을 가져가기 위한 메서드
    getters : {
        getCount : state => state.count,
    }
}