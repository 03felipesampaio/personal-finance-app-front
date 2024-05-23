<template>
  <div class="main-pannel-item" id="transactions-table-pannel">
    <h2>Transaction Table</h2>
    <table id="table-transactions">
      <thead >
        <th>File ID</th>
        <th>Place</th>
        <th>Description</th>
        <th>Value</th>
      </thead>
      <tr v-for="trn in transactions" :key="trn.id">
        <td>{{ trn.fileId }}</td>
        <td>{{ trn.place }}</td>
        <td>{{ trn.description }}</td>
        <td>{{ trn.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
const transactions = defineModel('transactions')
</script>

<style>
#transactions-table-pannel {
  margin: 0;
  padding: 0;
}

#table-transactions {
  /* display: flexbox; */
  width: 100%;
}

td {
  text-align: center;
}
/* #table-transactions thead,
tr {
  color: black;
} */
</style>
