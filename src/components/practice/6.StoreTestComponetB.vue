<template>
    <h1>Store Component B</h1>
    <p>지역변수값 : {{ count }}</p>
    <p>전역 Store 변수값 count : {{ getStoreCount }}</p>
</template>

<script>

export default {
    data() {
        return{
            count: 0,
        }
    },
    computed: {
        getStoreCount() {
            return this.$store.getters.getCount;
        }
    },
    methods: {

    }
}
</script>