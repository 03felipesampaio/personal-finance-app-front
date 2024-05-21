<template>
  <div class="main-pannel-item" id="rule-bar">
    <h3>Rules Bar</h3>
    <div id="current-transactions-rules">
      <h4>Current Rules</h4>
      <table>
        <thead>
          <th>Pattern</th>
          <th>Effect</th>
          <th>Up/Down</th>
        </thead>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
      </table>
    </div>
    <div id="add-rules-menu">
      <h4>Add rules</h4>
      <!-- <label for="add-rule-pattern">Add rule pattern for description</label> -->
      <input type="text" placeholder="Pattern" id="add-rule-pattern" />
      <!-- <label for=""></label> -->
      <input type="text" placeholder="Effect" id="add-rule-effect" />

      <button>Add</button>
    </div>
  </div>
</template>

<script setup></script>

<style>
#add-rules-menu input {
  display: block;
}
</style>
