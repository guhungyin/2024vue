<script setup>
    import { defineProps,defineEmits } from 'vue';
    defineProps(['cart'])
    const emit = defineEmits(['emitDelCart']);
    const delCartItem = (id) => {        
        emit('emitDelCart', id); // 傳遞事件名稱, 參數
    }
</script>
<template>
    <tr v-for="item in cart" :key="item.id">
        <td><button @click="delCartItem(item.id)" type="button" class="btn btn-sm">x</button></td>
        <td>{{ item.name }}</td>
        <td><small>{{ item.description }}</small></td>
        <td>
        <select 
        v-model="item.quantity" 
        class="form-select">
            <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
        </select>
        </td>
        <td>{{ item.price }}</td>
        <td>{{ item.price * item.quantity}}</td>
    </tr>
</template>