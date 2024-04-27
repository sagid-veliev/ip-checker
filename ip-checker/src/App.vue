<template>
    <header class="header">
      <nav class="navigation">
        <h1 class="navigation-logo">IP-PN.COM</h1>
        <div class="navigation-input">
          <img :src="SearchIcon" />
          <span>95.213.138.174</span>
        </div>
        <ul class="navigation-items">
          <li>Documentation</li>
          <li>Contacts</li>
          <li>Log in</li>
        </ul>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/icons/Search.svg";
</script>

<style lang="scss" scoped>
.header {
  background: #F2F0F0;
  width: 100%;
  display: flex;
  align-items: center;
}
.main {
  width: 100%;
}
.navigation {
  display: inline-flex;
  margin: auto;
  width: 80%;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  &-items {
    display: flex;
    gap: 2rem;
    list-style-type: none;
    padding: 0;
    margin: 0;
    & li:last-child {
      font-weight: bold;
    }
  }
  &-input {
    display: inline-flex;
    align-items: center;
    border: 1px solid #DADADA;
    border-radius: 4px;
    color: #8A8A8A;
    padding: 12px 8px;
    width: 460px;
    background: white;
    gap: 10px;
  }
}
</style>
