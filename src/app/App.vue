<template>
  <Header />
  <router-view />
</template>

<script setup>
import { Header } from '@/features/Header'
import { useCurrencyStore } from '@/app/stores/currencyStore'

const currencyStore = useCurrencyStore()
currencyStore.fetchExchangeRates()
</script>
