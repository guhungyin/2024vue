<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">首頁</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="HomeWork1">第一周作業</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="HomeWork2">第二周作業</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="HomeWork3">第三周作業</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
