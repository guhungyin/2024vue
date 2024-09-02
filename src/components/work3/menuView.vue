<script setup>
    import { defineProps , defineEmits} from 'vue';
    defineProps(['data'])

    const emit = defineEmits(['emitAddCart']); // 定義事件名稱
    const addCartItem = (item,id) => {
        emit('emitAddCart', item,id); // 傳遞事件名稱, 參數
    }
</script>
<template>
    <div class="col-md-4">
        <div class="list-group">
        <a 
            v-for="item in data" 
            :key="item.id"
            @click.prevent="addCartItem(item,item.id)" 
            href="#" 
            class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ item.name }}</h5>
            <small>${{ item.price }}</small>
            </div>
            <p class="mb-1">{{ item.description }}</p>
        </a>
        </div>
    </div>
</template>