<template>
  <div class="currency-input">
    <input
      type="number"
      class="amount-input"
      :value="modelValue"
      :placeholder="0"
      @focus="$emit('focus')"
      @input="handleAmountChange($event)"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: [Number, String],
  minLimit: {
    type: Number,
    default: 10,
  },
  maxLimit: {
    type: Number,
    default: 1000,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'focus'])

const handleAmountChange = (event) => {
  const val = event.target.value
  const parsedValue = parseFloat(val)
  emit('update:modelValue', parsedValue)

  if (val === '') {
    emit('update:modelValue', null)
    return
  }
}
</script>

<style scoped>
.currency-input {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
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

.error-message {
  color: red;
  font-size: 12px;
}
</style>
