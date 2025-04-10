<template>
  <div class="home">
    <h1>Курсы валют</h1>
    <p>Основная валюта: {{ baseCurrency }}</p>

    <div v-if="isLoading" class="loading">Загрузка данных...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="rates-container">
      <div v-for="currency in otherCurrencies" :key="currency" class="rate-card">
        <div class="rate-value">
          1 {{ baseCurrency }} = {{ formatRate(getRate(currency)) }} {{ currency }}
        </div>
        <div class="rate-change" :class="getTrendClass(currency)">
          {{ getTrendIcon(currency) }} {{ getRandomChange() }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/app/stores/currencyStore'

const currencyStore = useCurrencyStore()

const { baseCurrency, isLoading, error } = storeToRefs(currencyStore)
const getRate = currencyStore.getRate

const otherCurrencies = computed(() =>
  currencyStore.availableCurrencies.filter((c) => c !== currencyStore.baseCurrency),
)

const formatRate = (rate) => {
  if (!rate) return '—'
  return rate.toFixed(2)
}

const getRandomChange = () => (Math.random() * 2 - 1).toFixed(2)
const getTrendClass = () => {
  const change = parseFloat(getRandomChange())
  return change > 0 ? 'up' : 'down'
}
const getTrendIcon = () => {
  const change = parseFloat(getRandomChange())
  return change > 0 ? '↑' : '↓'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.rates-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.rate-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.rate-card:hover {
  transform: translateY(-5px);
}

.rate-value {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.rate-change {
  font-size: 0.9rem;
  color: #666;
}

.rate-change.up {
  color: #42b983;
}

.rate-change.down {
  color: #ff5252;
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-top: 1rem;
}

.error {
  color: #ff5252;
  background-color: #fff6f6;
}
</style>
