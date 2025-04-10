<template>
  <div class="convert-page">
    <h1>Конвертация валют</h1>

    <div class="converter-form">
      <div class="converter-row">
        <InputFiat
          v-model="amount1"
          :currency="currency1"
          @focus="activeInput = 1"
          @input="activeInput = 1"
          @update:currency="handleCurrencyChange(1, $event)"
        />
      </div>

      <div class="swap-button" @click="swapCurrencies">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
        </svg>
      </div>

      <div class="converter-row">
        <InputFiat
          v-model="amount2"
          :currency="currency2"
          @focus="activeInput = 2"
          @input="activeInput = 2"
          @update:currency="handleCurrencyChange(2, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/app/stores/currencyStore'
import { InputFiat } from '@/features/InputFiat'

const currencyStore = useCurrencyStore()
const { rate, baseCurrency } = storeToRefs(currencyStore)
// const { getRate } = currencyStore

const currency1 = ref(baseCurrency)
const currency2 = computed(() => {
  const otherCurrencies = currencyStore.availableCurrencies.filter((c) => c !== currency1.value)
  return otherCurrencies.length > 0 ? otherCurrencies[0] : baseCurrency
})

const activeInput = ref(1)
const amount1 = ref('')
const amount2 = ref('')

let updating = false

const convert = (amount, fromCurrency, toCurrency) => {
  if (!amount || isNaN(amount)) return ''
  if (fromCurrency === toCurrency) return amount

  const rateId = `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`
  const rateValue = rate.value[rateId]
  if (!rateValue) return ''
  const convertedAmount = amount * rateValue
  return Number(convertedAmount.toFixed(2))
}

const clear = () => {
  amount1.value = ''
  amount2.value = ''
}

watch(baseCurrency, () => {
  clear()
})

watch([amount1, amount2], ([newAmount1, newAmount2]) => {
  if (updating) return

  updating = true
  if (activeInput.value === 1) {
    amount2.value = convert(newAmount1, currency1.value, currency2.value)
  } else {
    amount1.value = convert(newAmount2, currency2.value, currency1.value)
  }
  updating = false
})

const handleCurrencyChange = (inputNumber, newCurrency) => {
  if (inputNumber === 1) {
    currency1.value = newCurrency
    amount2.value = convert(amount1.value, newCurrency, currency2.value)
  } else {
    currency2.value = newCurrency
    amount1.value = convert(amount2.value, newCurrency, currency1.value)
  }
}

const swapCurrencies = () => {
  const temp = currency1.value
  currency1.value = currency2.value
  currency2.value = temp

  amount2.value = convert(amount1.value, currency1.value, currency2.value)
}
</script>

<style scoped>
.convert-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.converter-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.converter-row {
  margin-bottom: 1.5rem;
}

.swap-button {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  cursor: pointer;
}

.swap-button svg {
  width: 24px;
  height: 24px;
  fill: #42b983;
  transition: transform 0.3s;
}

.swap-button:hover svg {
  transform: rotate(180deg);
}
</style>
