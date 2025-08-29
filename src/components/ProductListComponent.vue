<template>
    <v-container>
        <v-row>
            <v-col>
                <v-form>
                    <v-row class="d-flex justify-content-between mt-5">
                        <v-col cols="auto">
                            <v-select
                                :items="searchOptions"
                                v-model="searchType"
                                item-title="text"
                                item-value="value"
                                @keyup.enter="searchProduct"
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="searchValue" label="SEARCH" @keyup.enter="searchProduct"/>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn @click="searchProduct()" color="purple">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto">
                <v-btn @click="addToCart()" color="red">장바구니</v-btn>
                <v-btn @click="createOrder()" color="orange">주문하기</v-btn>
                <v-btn v-if="isAdmin" :to="{ name: 'ProductCreate' }">상품 등록</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        상품목록
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th v-if="!isAdmin">주문선택</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productList" :key="product.id">
                                    <td>
                                        <v-avatar size="150" class="elevation-1">
                                            <v-img :src="product.productImageUrl" cover></v-img>
                                        </v-avatar>
                                    </td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.stockQuantity }}</td>
                                    <td v-if="!isAdmin">
                                        <!-- input 박스는 화면에서 숫자처럼 보여도, 실제 입력값은 문자열 -->
                                        <v-text-field v-model.number="product.productCount" type="number" width="65px"/>
                                    </td>
                                    <td v-if="!isAdmin">
                                        <input type="checkbox" v-model="product.selected" /> <!-- id에 true / false 담김
                                        1: true, 2: false와 같이 -->
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    props: ['isAdmin', 'pageTitle'],
    data() {
        return {
            productList: [],
            selected: {},
            pageSize: 7,
            currentPage: 0,
            isLoading: false,
            isLastPage: false,
            searchType: "optional",
            searchValue: "", // 검색어
            searchOptions: [  
                { text: "선택", value: "optional" },
                { text: "상품명", value: "name" },
                { text: "카테고리", value: "category" }
            ]
        }
    },
    async created() {
        this.loadData();
        window.addEventListener('scroll', this.scrollPaging);
    },
    methods: {
        addToCart() {
            const orderProductList = this.productList
                .filter(p => p.selected && p.productCount > 0)
                .map(p => ({
                    productId: p.id,
                    productName: p.name, // cart에 담으려고 이름 정보도 포함
                    productCount: p.productCount
                }));

            console.log(orderProductList);
            orderProductList.forEach(p => {
                this.$store.dispatch("addToCart", p);
            });
        },
        searchProduct(){
            this.productList=[];
            this.currentPage = 0;
            this.isLastPage = false;
            this.isLoading = false;
            this.loadData();
        },
        scrollPaging(){
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (isBottom && !this.isLoading && !this.isLastPage) {
                this.loadData();
            }
        },
        async loadData(){
            this.isLoading = true;
            try {
                let params = {
                    size: this.pageSize,
                    page: this.currentPage,
                };
                if (this.searchType=="name")
                {
                    params.name = this.searchValue;
                }
                if (this.searchType=="category")
                {
                    params.category = this.searchValue;
                }
                // 문자열로도 직접 ?size/xx&page=yy 형태로도 조립이 가능하지만, params 라는 객체를 사용하면 파라미터 형식으로 url 조립
                const res = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
                const additionalData = res.data.result.content.map(p => ({ ...p, productCount: 0, selected: false }));
                if (additionalData.length > 0) {
                    this.productList = [...this.productList, ...additionalData];
                }
                this.currentPage++;
            } catch (e) {
                console.error('Failed to fetch product list:', e);
                alert('상품 목록을 불러오는데 실패했습니다.');
            } finally {
                this.isLoading = false;
            }
        },
        async createOrder() {
            try {
                const orderProductList = this.productList
                    .filter(p => p.selected && p.productCount > 0)
                    .map(p => ({
                        productId: p.id,
                        productCount: p.productCount
                    }));
                if (orderProductList.length > 0) {
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, orderProductList);
                    alert('주문이 성공적으로 생성되었습니다.');
                    window.location.reload();
                }
            } catch (e) {
                console.error(e);
                alert('주문 생성에 실패했습니다.');
            }
        }
    },
}
</script>
