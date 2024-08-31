<script setup>
import { ref } from 'vue';
import axios from 'axios'

const api = 'https://todolist-api.hexschool.io'

const myToken = ref()
const isSignUp = ref(false)
const isSignIn = ref(false)
// 註冊
const signUpField = ref({
  "email": '',
  "password": '',
  "nickname": ''
})
const messageSignUp = ref()
const signUp = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`,signUpField.value)
    console.log(res);
    messageSignUp.value = "UID：" + res.data.uid
    goSignInPage()
  } catch (error) {
    console.log(error);
    messageSignUp.value = error.response.data.message
  }
}
// 進註冊頁面
const goSignUpPage = () => {
  isSignUp.value = true
}
// 進登入頁面
const goSignInPage = () => {
  isSignUp.value = false
}
// 登入
const signInField = ref({
  "email": '',
  "password": ''
})
const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`,signInField.value)
    console.log(res);
    alert("登入成功")
    myToken.value =  res.data.token
    isSignIn.value = true
    document.cookie = `tokenName=${res.data.token}`;
    getAllTodos()
  } catch (error) {
    console.log(error);
    alert(error.response.data.message) 
  }
}


// 驗證
const user = ref({
  uid: '',
  nickname: ''
})
const messageCheckout = ref()
const checkout = async() => {
  try{
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)tokenName\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    console.log(token);
    myToken.value = token
    const res = await axios.get(`${api}/users/checkout`,{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    user.value = res.data
    messageCheckout.value = "驗證成功"
  }catch(error){
    console.log(error);
    messageCheckout.value = "尚未登入無法驗證" + error.message
  }

}

// 登出
const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`,{},{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    alert(res.data.message)
    isSignIn.value = false
  } catch (error) {
    console.log(error);

    alert("登出失敗" + error.message)
  }
}


// 待辦事項                               
const data = ref([]);

// 取得待辦事項                               
const getAllTodos = async() => {
  try {
    const res = await axios.get(`${api}/todos`,{
      headers: {
        Authorization:myToken.value
      }
    })
    data.value = res.data.data
    console.log(res);
  } catch (error) {
    console.log(error);
    
  }
}
//新增待辦事項 
const todoText = ref({
  "content" : ''
});
const addTodo = async() => {
  try {
    const res = await axios.post(`${api}/todos`,todoText.value
    ,{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    getAllTodos();
    todoText.value = {
      "content" : ''
    }
  } catch (error) {
    console.log(error);
  }
}


// 修改
const editTodoItem = ref({
  id:'',
  content:''
})
const cancelEditTodoItem = () => {
  editTodoItem.value = {
    id:'',
    content:''
  }
}
const upDateTodoItem = (id) => {
  console.log();
  
  const index = data.value.findIndex((item) => item.id === id)
  editTodoItem.value.id = id;
  editTodoItem.value.content = data.value[index].content
}
const editTodo = async() => {
  try {
    
    const res = await axios.put(`${api}/todos/${editTodoItem.value.id}`,{
      content : editTodoItem.value.content
    }
    ,{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    getAllTodos();
    cancelEditTodoItem();
  } catch (error) {
    console.log(error);
  }
}


// 刪除待辦事項                               
const delTodo = async(id) => {
  try {
    const res = await axios.delete(`${api}/todos/${id}`,{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    getAllTodos()
    alert(res.data.message)
  } catch (error) {
    console.log(error);
    
  }
}


//完成待辦事項

const finishTodo = async(id) => {
  try {
    const res = await axios.patch(`${api}/todos/${id}/toggle`,{},{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    getAllTodos()
    // alert(res.data.message)
  } catch (error) {
    console.log(error);
    
  }
}


</script>

<template>
  <div class="container">

    <div v-if="isSignIn">
      <div class="border border-dark rounded-1 p-4 mx-auto mt-5 bg-light">
        <h2 class="mb-4">待辦事項</h2>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control mb-3" placeholder="輸入待辦事項" v-model="todoText.content">
            </div>
          <div class="col">
            <button type="button" class="btn btn-primary" @click="addTodo">新增</button>
          </div>
        </div>
        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">狀態</th>
              <th scope="col">內容</th>
              <th scope="col">功能</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.status ? '完成' : '未完成' }}</td>
              <td>{{ item.content }}</td>
              <td>
                <div v-if="editTodoItem.id === item.id" class="row mb-3">
                  <input type="text" class="form-control col" v-model="editTodoItem.content">
                  <button class="btn btn-outline-dark mx-2 col-2" type="button" @click="cancelEditTodoItem()">取消</button>
                  <button class="btn btn-outline-dark mx-2 col-2" type="button" @click="editTodo()">確認</button>
                </div>
                <button class="btn btn-outline-dark mx-2" type="button" @click="upDateTodoItem(item.id)">修改</button>
                <button class="btn btn-outline-dark mx-2" type="button" @click="delTodo(item.id)">刪除</button>
                <button class="btn btn-outline-dark mx-2" type="button" @click="finishTodo(item.id)">變更狀態</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-6">
          <h2>驗證</h2>
          <p>UID：{{ user.uid }}</p>
          <p>nickName：{{ user.nickname }}</p>
          <input class="form-control mb-2" type="text" v-model="myToken" placeholder="token">
          <button class="btn btn-outline-dark" type="button" @click="checkout">驗證</button>
          <p>{{ messageCheckout }}</p>
        </div>
        <div class="col-6">
          <h2>登出</h2>
          <input class="form-control mb-2" type="text" v-model="myToken" placeholder="token">
          <button class="btn btn-outline-dark" type="button" @click="signOut">登出</button>
        </div>
      </div>
    </div>
    <form v-else class="w-50 border border-dark rounded-1 p-4 mx-auto mt-5 bg-light">
      <template v-if="isSignUp">
        <h2 class="mb-4">註冊</h2>
        <input class="form-control mb-3" v-model="signUpField.email" placeholder="Email" type="email"/>
        <input class="form-control mb-3" v-model="signUpField.password" placeholder="Password" type="password" />
        <input class="form-control mb-3" v-model="signUpField.nickname" placeholder="Nickname" type="text" />
        <button class="btn btn-primary me-3" type="button" @click="signUp">註冊</button>
        <button class="btn btn-outline-primary" type="button" @click="goSignInPage">登入</button>
        <p>{{ messageSignUp }}</p>
      </template>
      <template v-else>
        <h2 class="mb-4">登入</h2>
        <input class="form-control mb-3" v-model="signInField.email" placeholder="Email" type="email"/>
        <input class="form-control mb-3" v-model="signInField.password" placeholder="Password" type="password" />
        <button class="btn btn-primary me-3" type="button" @click="signIn">登入</button>
        <button class="btn btn-outline-primary" type="button" @click="goSignUpPage">註冊</button>
      </template>
    </form>
  </div>
</template>
