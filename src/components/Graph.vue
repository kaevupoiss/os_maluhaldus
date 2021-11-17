<template>
  <div class="graph">
    <p>{{ usedAlgorithm }}</p>
    <table>
      <thead>
        <th class="etapp">
          <b>Etapp</b>
        </th>
        <th class="protsess">
          <b>Lisatud Protsess</b>
        </th>
        <th v-for="i in 50" :key="'th' + i">
          {{ i - 1 }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in inputArray" :key="'tr' + i">
          <td class="etapp">{{ i }}</td>
          <td class="protsess">
            {{
              inputArray
                ? alphabet[i - 1] +
                  " : " +
                  processes[i - 1][0] +
                  "," +
                  processes[i - 1][1]
                : "-"
            }}
          </td>
          <td
            v-for="(element, j) in row"
            :key="'td' + i + '-' + j"
            class="data"
            :cellspan="element[2] - element[1]"
          >
            {{ inputArray ? element[0] : "-" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    inputArray: {
      type: Array,
    },
    usedAlgorithm: {
      type: String,
      default: "Puhas väljund",
    },
    processes: {
      type: Array,
    },
  },
  data: function () {
    return {
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    };
  },
  computed: {},
};
</script>

<style lang="scss">
.graph {
  padding: 2rem;

  p {
    margin-bottom: 2rem;
  }
}

td.data {
  border: 1px solid $grey500;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
}

td.protsess,
th.protsess {
  padding: 0 1rem;
}
</style>
