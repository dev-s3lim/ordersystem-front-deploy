import OrderingListComponent from "@/components/OrderingListComponent.vue";
import OrderCart from "@/views/OrderCart.vue";

export const orderingRouter = [
    {
        path: "/ordering/list",
        name: "OrderingList",
        component: OrderingListComponent
    },
    {
        path: "/ordering/cart",
        name: "OrderingCart",
        component: OrderCart
    },
];
