import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurrencyStore = defineStore('currency', () => {
  const rate = ref({})
  const baseCurrency = ref('RUB')
  const availableCurrencies = ref(['USD', 'EUR', 'RUB', 'IDR', 'KZT'])
  const exchangeRates = ref({})
  const isLoading = ref(false)
  const error = ref(null)

  const setBaseCurrency = (currency) => {
    if (availableCurrencies.value.includes(currency)) {
      baseCurrency.value = currency
      fetchExchangeRates()
    }
  }

  const getRate = (currency) => {
    return exchangeRates.value[currency] || null
  }

  const fetchExchangeRates = async () => {
    try {
      isLoading.value = true
      error.value = null

      const response = await fetch('https://status.neuralgeneration.com/api/currency/')
      const data = await response.json()
      rate.value = data || {}

      console.log('Курс валют:', rate.value)

      const rates = Object.entries(data)
        .filter(([key]) => key.startsWith(baseCurrency.value.toLowerCase()))
        .reduce((acc, [key, value]) => {
          const currency = key.split('-')[1].toUpperCase()
          acc[currency] = value
          return acc
        }, {})

      console.log('Курсы валют:', rates)

      exchangeRates.value = rates
    } catch (err) {
      error.value = 'Не удалось загрузить курсы валют'
      console.error('Ошибка при загрузке курсов валют:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    rate,
    baseCurrency,
    availableCurrencies,
    exchangeRates,
    isLoading,
    error,
    setBaseCurrency,
    fetchExchangeRates,
    getRate,
  }
})
