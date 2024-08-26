<script setup>
import { ref } from 'vue'
const menu = ref([
  {
    id: 0,
    name: '珍珠奶茶',
    introduce: '香濃奶茶搭配QQ珍珠',
    price: 50,
    stock: 20
  },
  {
    id: 1,
    name: '冬瓜檸檬',
    introduce: '清新冬瓜配上新鮮檸檬',
    price: 45,
    stock: 18
  },
  {
    id: 2,
    name: '翡翠檸檬',
    introduce: '綠茶與檸檬的完美結合',
    price: 55,
    stock: 34
  },
  {
    id: 3,
    name: '四季春茶',
    introduce: '香醇四季春茶，回甘無比',
    price: 45,
    stock: 10
  },
  {
    id: 4,
    name: '阿薩姆奶茶',
    introduce: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    stock: 25
  },
  {
    id: 5,
    name: '檸檬冰茶',
    introduce: '檸檬與冰茶的清新組合',
    price: 55,
    stock: 18
  },
  {
    id: 6,
    name: '芒果綠茶',
    introduce: '芒果與綠茶的獨特風味',
    price: 55,
    stock: 18
  },
  {
    id: 7,
    name: '抹茶拿鐵',
    introduce: '抹茶與鮮奶的絕配',
    price: 60,
    stock: 20
  }
])
const editMenu = ref({})
// 加減庫存數量
const addStock = (item) => {
  item.stock++
}
const reduceStock = (item) => {
  if (item.stock > 0) {
    item.stock--
  }
}
// 編輯
const editBtn = (item) => {
  editMenu.value = { ...item } //拷貝  值就不會連動
}
// 儲存
const saveBtn = () => {
  const index = menu.value.findIndex((item) => item.id === editMenu.value.id)
  menu.value[index] = editMenu.value
  editMenu.value = {}
}
</script>

<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in menu" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.introduce }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button class="btn btn btn-outline-secondary btn-sm" @click="reduceStock(item)">
              -
            </button>
            <span class="mx-3">{{ item.stock }}</span>
            <button class="btn btn btn-outline-secondary btn-sm" @click="addStock(item)">+</button>
          </td>
          <td>
            <button class="btn btn btn-outline-secondary btn-sm" @click="editBtn(item)">
              編輯
            </button>
          </td>
        </tr>
        <template v-if="editMenu.id">
          <h2>編輯</h2>
          <tr>
            <td>
              <input type="text" v-model="editMenu.name" />
            </td>
            <td>
              <input type="text" v-model="editMenu.introduce" />
            </td>
            <td>
              <input type="text" v-model="editMenu.price" />
            </td>
            <td>
              <button class="btn btn btn-outline-secondary btn-sm" @click="reduceStock(editMenu)">
                -
              </button>
              <span class="mx-3">{{ editMenu.stock }}</span>
              <button class="btn btn btn-outline-secondary btn-sm" @click="addStock(editMenu)">
                +
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn btn-outline-secondary btn-sm me-2"
                @click="saveBtn"
              >
                儲存
              </button>
              <button
                type="button"
                class="btn btn btn-outline-secondary btn-sm"
                @click="editMenu = {}"
              >
                取消
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
