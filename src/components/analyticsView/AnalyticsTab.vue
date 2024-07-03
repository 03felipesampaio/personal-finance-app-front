<template>
  <div>
    <apexchart
      width="500"
      type="line"
      :options="balanceChart.options"
      :series="balanceChart.series"
    ></apexchart>
    <apexchart
      width="500"
      type="bar"
      :options="billChart.options"
      :series="billChart.series"
    ></apexchart>
    <apexchart
      width="500"
      type="pie"
      :options="categoryChart.options"
      :series="categoryChart.series"
    ></apexchart>
  </div>
</template>

<script setup>
// import VueApexCharts from 'vue3-apexcharts'
import { getMonthlyBalance, getBillsValuesByBank, getExpensesByCategory } from '../../api'

const monthlyBalance = await getMonthlyBalance()
const billValues = await getBillsValuesByBank()
const expensesByCategory = (await getExpensesByCategory()).sort((x, y) => x.value < y.value)

const balanceChart = {
  options: {
    chart: {
      id: 'ballance-chart'
    },
    xaxis: {
      type: 'datetime'
    }
  },
  series: [
    {
      name: 'Ballance',
      data: monthlyBalance.map((bal) => {
        return { x: `${bal.month}-01`, y: bal.total_incomes }
      })
    }
  ]
}

const billChart = {
  options: {
    xaxis: {
      type: 'datetime'
    },
    dataLabels: {
      enabled: false
    }
    // bar: {

    // }
    // chart: {
    //   stacked: true,
    //   stackedType: '100%'
    // }
  },
  series: [
    {
      name: 'Inter',
      data: billValues
        .filter((bill) => bill.bank_name === 'Inter')
        .map((bill) => {
          return { x: `${bill.reference_month}-01`, y: bill.bill_value }
        }),
      color: '#E56700'
    },
    {
      name: 'Nubank',
      data: billValues
        .filter((bill) => bill.bank_name === 'Nubank')
        .map((bill) => {
          return { x: `${bill.reference_month}-01`, y: bill.bill_value }
        }),
      color: '#612F74'
    }
  ]
}

const categoryChart = {
  options: {
    labels: expensesByCategory.map((cat) => cat.category)
  },
  series: expensesByCategory.map((cat) => cat.value)
}
</script>

<style scoped>
.vue-apexcharts {
  display: inline-block;
}
</style>
