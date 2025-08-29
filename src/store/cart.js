function initState(){
    return {
        totalQuantity: localStorage.getItem("totalQuantity") || 0,
        // 카트 백엔드가 있는 경우에는 굳이 local storage 사용 필요 없음 (단, 실시간 성으로 사용하려면 반드시 상태관리 필요)
        productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || []
    }
}

export const cart = {
    state: initState,
    mutations : {
        // 전체 장바구니 수량
        addToCart(state, product){
        state.totalQuantity = parseInt(state.totalQuantity) + product.productCount;
        localStorage.setItem("totalQuantity", state.totalQuantity);

        // 장바구니 안에 상품 목록
        localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart));

        const existProduct = state.productsInCart.find(p => p.productId === product.productId);
            if (existProduct) {
                existProduct.productCount += product.productCount;
            } else {
                state.productsInCart.push(product);
            }
        localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart));
    },
    clearCart(state){
        state.productsInCart = [];
        state.totalQuantity = 0;
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("totalQuantity");
        },
    },
    actions : {
        addToCart(context, product){
            context.commit('addToCart', product);
        },
        clearCart(context){
            context.commit('clearCart');
        }
    },
    getters : {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
}
