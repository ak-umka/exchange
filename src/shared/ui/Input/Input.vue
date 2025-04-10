<template>
  <div class="currency-input">
    <input
      type="number"
      class="amount-input"
      :value="modelValue"
      :placeholder="0"
      @input="$emit('update:modelValue', handleAmountChange($event))"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: [Number, String],
})

defineEmits(['update:modelValue'])

const handleAmountChange = (event) => {
  const val = event.target.value
  if (val === '') return ''

  return parseFloat(val.replace(',', '.'))
}
</script>

<style scoped>
.currency-input {
  display: flex;
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
</style>
