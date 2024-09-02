<script setup>
  import { ref,computed } from 'vue';
  import menuView from '@/components/work3/menuView.vue'
  import orderView from '@/components/work3/orderView.vue';
  import cartView from '@/components/work3/cartView.vue';
  const data = ref([
    {
      "id": 1,
      "name": "珍珠奶茶",
      "description": "香濃奶茶搭配QQ珍珠",
      "price": 50
    },
    {
      "id": 2,
      "name": "冬瓜檸檬",
      "description": "清新冬瓜配上新鮮檸檬",
      "price": 45
    },
    {
      "id": 3,
      "name": "翡翠檸檬",
      "description": "綠茶與檸檬的完美結合",
      "price": 55
    },
    {
      "id": 4,
      "name": "四季春茶",
      "description": "香醇四季春茶，回甘無比",
      "price": 45
    },
    {
      "id": 5,
      "name": "阿薩姆奶茶",
      "description": "阿薩姆紅茶搭配香醇鮮奶",
      "price": 50
    },
    {
      "id": 6,
      "name": "檸檬冰茶",
      "description": "檸檬與冰茶的清新組合",
      "price": 45
    },
    {
      "id": 7,
      "name": "芒果綠茶",
      "description": "芒果與綠茶的獨特風味",
      "price": 55
    },
    {
      "id": 8,
      "name": "抹茶拿鐵",
      "description": "抹茶與鮮奶的絕配",
      "price": 60
    }
  ]);
  // 購物車
  const cart = ref([]);
  // 備註
  const remark = ref('')
  // 訂單
  const order = ref({
    cart: [],
    remark: '',
    totalNum: ''
  });
  //計算訂單裡的總金額
  const totalNum = computed(() => {
    return cart.value.reduce((pre,next) => {
      return pre + next.price * next.quantity
    },0)
  })

  // 加入購物車
  const addCart = (item,id) => {
    const index = cart.value.findIndex((item) => item.id ===id)
    if(index !== -1){
        return
    }else{
      cart.value.push({
        ...item, //展開品項
        quantity: 1 //預設數量為 1
      })
    }
  }
  // 刪除購物車裡的品項
  const delCart = (id) => {
    //比對點擊到的品項id跟cart裡的品項id，如果一樣就找出在cart裡的index值是多少
    const index = cart.value.findIndex((item) => item.id ===id)
    console.log(index);
    cart.value.splice( index , 1 )
  }
  //送出訂單
  const sendOrder = () => {
    order.value.cart = cart.value
    order.value.remark = remark.value
    order.value.totalNum = totalNum.value
    console.log(order.value);
    // 清空購物車
    cart.value = []
    remark.value = ''
  }
</script>
<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
      <!-- 菜單 -->
        <menuView 
        :data="data"
        @emitAddCart="addCart"/>
        <!-- 購物車 -->
        <div class="col-md-8">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" width="50">操作</th>
                  <th scope="col">品項</th>
                  <th scope="col">描述</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <cartView 
                @emitDelCart="delCart"
                :cart="cart"/>
              </tbody>
            </table>
            <div
              v-if="cart.length === 0"
              class="alert alert-primary" 
              role="alert">
              請選擇商品
            </div>
            <div v-else>
              <div class="text-end mb-3">
                <h5>總計: <span>{{ totalNum }}</span></h5>
              </div>
              <textarea
                v-model="remark"
                class="form-control mb-3"
                rows="3"
                placeholder="備註"
              ></textarea>
              <div class="text-end">
                <button
                  @click="sendOrder"
                  class="btn btn-primary">送出</button>
              </div>
            </div>
        </div>
      </div>
      <hr />
      <!-- 訂單 -->
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="order.totalNum === ''" class="alert alert-info" role="alert">
            尚未建立訂單
          </div>
          <div v-else class="card">
            <orderView :order="order"/> <!--前內部元件名稱，後外部傳遞資料的名稱-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>