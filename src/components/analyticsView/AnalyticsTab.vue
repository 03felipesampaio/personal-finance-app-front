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
const billValues = pivotBy(
  await getBillsValuesByBank(),
  'reference_month',
  'bank_name',
  'bill_value'
)
const expensesByCategory = (await getExpensesByCategory()).sort((x, y) => x.value < y.value)

function pivotBy(data, indexCol, col, valueCol) {
  const uniqueIndexCol = [...new Set(data.map((row) => row[indexCol]))]
  const uniqueCol = [...new Set(data.map((row) => row[col]))]

  const pivoted = []
  for (const index of uniqueIndexCol) {
    const newRow = {}

    newRow[indexCol] = index

    for (const value of uniqueCol) newRow[value] = null

    pivoted.push(newRow)
  }

  for (const row of data) {
    const pivotedRow = pivoted.find((x) => x[indexCol] === row[indexCol])

    pivotedRow[row[col]] = row[valueCol]
  }

  return pivoted
}

// console.log(pivotBy(await billValues, 'reference_month', 'bank_name', 'bill_value'))

const balanceChart = {
  options: {
    chart: {
      id: 'ballance-chart'
    },
    xaxis: {
      type: 'datetime',
      categories: monthlyBalance.map((bal) => `${bal.month}-01`)
    },
    yaxis: {
      labels: {
        formatter: (value) => `R$ ${value}`
      }
    },
    title: {
      text: 'Incomes and Expenses'
    }
  },
  series: [
    {
      name: 'Expenses',
      data: monthlyBalance.map((bal) => bal.total_expenses),
      color: '#F4442E'
    },
    {
      name: 'Income',
      data: monthlyBalance.map((bal) => bal.total_incomes)
      // color: '#04724D'
    }
  ]
}

const billChart = {
  options: {
    xaxis: {
      type: 'datetime',
      categories: billValues.map((bill) => bill.reference_month)
    },
    yaxis: {
      labels: {
        formatter: (value) => `R$ ${value}`
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Credit Card Bills'
    },
    chart: {
      stacked: true
    }
  },
  series: [
    {
      name: 'Inter',
      data: billValues.map((bill) => bill['Inter']),
      color: '#E56700'
    },
    {
      name: 'Nubank',
      data: billValues.map((bill) => bill['Nubank']),
      color: '#612F74'
    }
  ]
}

const categoryChart = {
  options: {
    labels: expensesByCategory.map((cat) => cat.category),
    title: {
      text: 'Expenses by Category'
    }
  },
  series: expensesByCategory.map((cat) => cat.value)
}
</script>

<style scoped>
.vue-apexcharts {
  display: inline-block;
}
</style>
