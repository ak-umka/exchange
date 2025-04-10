<template>
  <div class="currency-dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown">
      {{ modelValue }}
      <span class="arrow">▼</span>
    </button>
    <ul v-if="isDropdownOpen" class="dropdown-menu">
      <li
        v-for="currency in currencies"
        :key="currency"
        @click="selectCurrency(currency)"
        :class="{ active: currency === modelValue }"
      >
        {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: String,
  currencies: {
    type: Array,
    required: true,
  },
})

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const emit = defineEmits(['update:modelValue'])

const selectCurrency = (currency) => {
  isDropdownOpen.value = false
  emit('update:modelValue', currency)
}
</script>

<style scoped>
.currency-dropdown {
  position: relative;
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
  z-index: 10;
  position: absolute;
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
