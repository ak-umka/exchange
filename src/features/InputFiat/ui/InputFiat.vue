<template>
  <div class="input-fiat">
    <Dropdown
      :modelValue="currency"
      :currencies="currencies"
      class="input-select"
      @update:modelValue="handleCurrencyChange"
    />
    <Input
      :modelValue="modelValue"
      @update:modelValue="handleAmountChange"
      @focus="$emit('focus')"
      :minLimit="minLimit"
      :maxLimit="maxLimit"
      :errorMessage="errorMessage"
    />
  </div>
</template>

<script setup>
import Input from '@/shared/ui/Input/Input.vue'
import Dropdown from '@/shared/ui/Dropdown/Dropdown.vue'

const props = defineProps({
  modelValue: [Number, String],
  currency: String,
  currencies: {
    type: Array,
    default: () => [],
  },
  minLimit: {
    type: Number,
  },
  maxLimit: {
    type: Number,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'update:currency', 'focus'])

const handleCurrencyChange = (newCurrency) => {
  emit('update:currency', newCurrency)
}

const handleAmountChange = (event) => {
  const val = event
  emit('update:modelValue', val)
}
</script>

<style scoped>
.input-fiat {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.input-select {
  padding: 0.75rem;
  border: none;
  background-color: #f5f5f5;
  font-size: 1rem;
  cursor: pointer;
}
</style>
