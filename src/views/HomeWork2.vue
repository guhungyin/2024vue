<script setup>
import { ref } from 'vue';
import axios from 'axios'

const api = 'https://todolist-api.hexschool.io'

const myToken = ref()

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
  } catch (error) {
    console.log(error);
    messageSignUp.value = error.response.data.message
  }
}
// 登入
const signInField = ref({
  "email": '',
  "password": ''
})
const messageSignIn = ref()
const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`,signInField.value)
    console.log(res);
    messageSignIn.value = "登入成功" +res.data.token
    myToken.value =  res.data.token
    document.cookie = `tokenName=${res.data.token}`;
  } catch (error) {
    console.log(error);
    messageSignIn.value = error.response.data.message

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
const messageSignOut = ref()
const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`,{},{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    messageSignOut.value = res.data.message
  } catch (error) {
    console.log(error);
    messageSignOut.value = "登出失敗" + error.message
  }
}

</script>

<template>
  <div class="container">
    <h2>註冊</h2>
    <input class="form-control mb-2" v-model="signUpField.email" placeholder="Email" />
    <input class="form-control mb-2" v-model="signUpField.password" placeholder="Password" type="password" />
    <input class="form-control mb-2" v-model="signUpField.nickname" placeholder="Nickname" type="text" />
    <button class="btn btn-outline-dark" type="button" @click="signUp">註冊</button>
    <p>{{ messageSignUp }}</p>

    <h2>登入</h2>
    <input class="form-control mb-2" v-model="signInField.email" placeholder="Email" />
    <input class="form-control mb-2" v-model="signInField.password" placeholder="Password" type="password" />
    <button class="btn btn-outline-dark" type="button" @click="signIn">登入</button>
    <p>{{ messageSignIn }}</p>

    <h2>驗證</h2>
    <p>UID：{{ user.uid }}</p>
    <p>nickName：{{ user.nickname }}</p>
    <input class="form-control mb-2" type="text" v-model="myToken" placeholder="token">
    <button class="btn btn-outline-dark" type="button" @click="checkout">驗證</button>
    <p>{{ messageCheckout }}</p>

    <h2>登出</h2>
    <input class="form-control mb-2" type="text" v-model="myToken" placeholder="token">
    <button class="btn btn-outline-dark" type="button" @click="signOut">登出</button>
    <p>{{ messageSignOut }}</p>

  </div>
</template>
