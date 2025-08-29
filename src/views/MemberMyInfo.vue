<template>
    <MemberDetailComponent :isMyPage="true" :pageTitle="'내 회원정보'" />
</template>

<script>
    import MemberDetailComponent from '@/components/MemberDetailComponent.vue';

    export default {
        components: {
            MemberDetailComponent
        },
        data() {
            return {
            }
        },
    }
</script>