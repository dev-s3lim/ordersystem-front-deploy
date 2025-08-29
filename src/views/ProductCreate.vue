<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title class="text-center text-h5">
            <h1>상품등록</h1>
          </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="상품명" v-model="name"></v-text-field>
                <v-text-field label="카테고리" v-model="category"></v-text-field>
                <v-text-field label="가격" type="number" v-model="price"></v-text-field>
                <v-text-field label="재고수량" type="number" v-model="stockQuantity"></v-text-field>
                <v-file-input label="상품 이미지" accept="image/**" @change="fileUpload"></v-file-input>
                <v-row>
                  <v-col class="text-center">
                    <v-btn color="primary" block @click="productCreate()">
                      상품등록
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {
                name: "",
                category: "",
                price: null,
                stockQuantity: null,
                productImage: null
            }
        },
        methods: {
            fileUpload(event) {
                this.productImage = event.target.files[0];
            },
            async productCreate() { // multi-part-form data 또는 Url 인코딩 방식인 경우에, form data 클래스 사용해서 객체 조립
                try {
                    let data = new FormData();
                    data.append("name", this.name);
                    data.append("category", this.category);
                    data.append("price", this.price);
                    data.append("stockQuantity", this.stockQuantity);
                    data.append("productImage", this.productImage);
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`, data);
                    this.$router.push("/product/manage"); // 상품 등록 후, 상품 목록으로 이동
                } catch (e) {
                    console.error("Error creating product:", e);
                    alert("상품 등록에 실패했습니다.");
                }
            }
        }
    }
</script>