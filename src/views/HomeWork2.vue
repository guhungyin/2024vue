<script setup></script>

<template>
  <div>
    <h2>註冊</h2>
    <input v-model="emailSignUp" placeholder="Email" />
    <input v-model="passwordSignUp" placeholder="Password" type="password" />
    <input v-model="nickname" placeholder="Nickname" type="text" />
    <button @click="signUp">Sign Up</button>
    <p>{{ messageSignUp }}</p>

    <h2>登入</h2>
    <input v-model="emailSignIn" placeholder="Email" type="email" />
    <input v-model="passwordSignIn" placeholder="Password" type="password" />
    <button @click="signIn">Sign In</button>
    <p>Token: {{ token }}</p>

    <h2>驗證</h2>
    <input v-model="tokenCheck" placeholder="Token" />
    <button @click="checkOut">Check Out</button>
    <p>{{ messageCheckOut }}</p>

    <h2>登出</h2>
    <input v-model="tokenSignOut" placeholder="Token" />
    <button @click="signOut">Sign Out</button>

    <hr />
    <h2>Todo list</h2>
    <div v-if="token">
      <input v-model="newTodo" placeholder="New Todo" />
      <button @click="addTodo">Add Todo</button>
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          {{ todo.content }} {{ todo.status ? '完成' : '未完成' }} | {{ todoEdit[todo.id] }}
          <input type="text" placeholder="更新值" @change="updateTodoEdit($event, todo.id)" />
          <button @click="deleteTodo(todo.id)">Delete</button>
          <button @click="updateTodo(todo.id)">Update</button>
          <button @click="toggleStatus(todo.id)">Toggle Status</button>
        </li>
      </ul>
    </div>
  </div>
</template>
