<template>
  <div class="currency-input">
    <Dropdown
      :modelValue="currency"
      :currencies="availableCurrencies"
      class="currency-select"
      @update:modelValue="handleCurrencyChange"
    />

    <Input :modelValue="amount" @update:modelValue="handleAmountChange" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/app/stores/currencyStore'
import Input from '@/shared/ui/Input/Input.vue'
import Dropdown from '@/shared/ui/Dropdown/Dropdown.vue'

const props = defineProps({
  amount: [Number, String],
  currency: String,
})

const emit = defineEmits(['update:modelValue', 'update:currency'])

const currencyStore = useCurrencyStore()
const { availableCurrencies } = storeToRefs(currencyStore)

const handleCurrencyChange = (newCurrency) => {
  emit('update:currency', newCurrency)
}

const handleAmountChange = (event) => {
  const val = event.target.value
  if (val === '') return ''
  emit('update:modelValue', parseFloat(val.replace(',', '.')))
}
</script>

<style scoped>
.currency-input {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.currency-select {
  padding: 0.75rem;
  border: none;
  background-color: #f5f5f5;
  font-size: 1rem;
  cursor: pointer;
}

.amount-input {
  flex-grow: 1;
  padding: 0.75rem;
  border: none;
  font-size: 1rem;
  text-align: right;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.amount-input:focus {
  outline: none;
  background-color: #f9f9f9;
}
</style>
