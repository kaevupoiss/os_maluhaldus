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
        <tr v-for="i in 10" :key="'tr' + i">
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
          <td v-for="j in 50" :key="'td' + i + '-' + j" class="data">
            {{ inputArray ? formatedArray[i - 1][j - 1] : "-" }}
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
  computed: {
    formatedArray: function () {
      let arr = [];
      for (let index = 0; index < this.inputArray.length; index++) {
        const etapp = this.inputArray[index];
        const row = [];
        for (let i = 0; i < 50; i++) {
          if (etapp[0][1] <= i) {
            row.push(etapp[0][0]);
            etapp[0][3] -= 1;
            if (etapp[0][3] == 0) {
              etapp.shift();
            }
          } else row.push("-");
        }
      }

      return arr;
    },
  },
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
