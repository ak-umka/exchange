<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/convert" class="nav-link">Конвертация</router-link>

      <Dropdown v-model="baseCurrency" :currencies="availableCurrencies" />
    </nav>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/app/stores/currencyStore'
import Dropdown from '@/shared/ui/Dropdown/Dropdown.vue'
import { watch } from 'vue'

const currencyStore = useCurrencyStore()
const { baseCurrency, availableCurrencies } = storeToRefs(currencyStore)

watch(baseCurrency, async () => {
  await currencyStore.fetchExchangeRates()
})
</script>

<style scoped>
.header {
  background-color: #2c3e50;
  padding: 1rem;
  color: white;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #34495e;
}

.router-link-active {
  background-color: #42b983;
}

.currency-dropdown {
  position: relative;
  margin-left: auto;
}

.dropdown-toggle {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  min-width: 100px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #333;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

.dropdown-menu li.active {
  background-color: #42b983;
  color: white;
}

.arrow {
  font-size: 0.8em;
}
</style>
