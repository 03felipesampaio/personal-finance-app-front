<template>
  <div class="main-pannel-item" id="transactions-table-pannel">
    <table id="table-transactions">
      <thead>
        <tr>
          <th v-for="col in tableColumns" :key="col">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="trn in transactions"
          :key="trn.id"
          :class="{ highlited: patternMatchedTransactionIds.includes(trn.id) }"
        >
          <!-- <td>{{ trn.sourceId }}</td> -->
          <td v-for="col in tableColumns" :key="trn.id + '_' + col">
            {{ col !== 'date' ? trn[col] : dayjs(trn[col]).format('DD/MM/YY') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

const transactions = defineModel('transactions')
defineProps(['tableColumns', 'patternMatchedTransactionIds'])
</script>

<style>
#transactions-table-pannel {
  margin: 0;
  padding: 0;

  overflow-y: scroll;
}

#table-transactions {
  /* display: flexbox; */
  border-collapse: collapse;
  font-size: 0.9em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  /* margin: 25px 0; */
  width: 100%;
}

#table-transactions thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

#table-transactions th,
#table-transactions td {
  padding: 5px 5px;
}

.highlited {
  background-color: #61d6bf57;
}

#table-transactions tbody tr {
  border-bottom: 1px solid #dddddd;
}

/* #table-transactions tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
} */

#table-transactions tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

td {
  text-align: left;
}
/* #table-transactions thead,
tr {
  color: black;
} */
</style>
