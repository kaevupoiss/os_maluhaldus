<template>
  <div class="graph">
    <p>{{ usedAlgorithm }}</p>
    <div class="table">
      <div class="table-head">
        <div class="th etapp">
          <b>Etapp</b>
        </div>
        <div class="th protsess">
          <b>Lisatud Protsess</b>
        </div>
        <div v-for="i in 50" :key="'th' + i" class="th">
          {{ i - 1 }}
        </div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(row, i) in inputArray" :key="'tr' + i">
          <div class="td etapp">{{ i }}</div>
          <div class="td protsess">
            {{
              processes[i]
                ? alphabet[i] + " : " + processes[i][0] + "," + processes[i][1]
                : "-"
            }}
          </div>
          <div
            v-for="(element, j) in row"
            :key="'td' + i + '-' + j"
            class="td data"
            :style="{ gridColumn: element[1] + 3 + ' / ' + (element[2] + 3) }"
          >
            {{ inputArray ? element[0] : "-" }}
          </div>
        </div>
      </div>
    </div>
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

.table-head {
  display: grid;
  grid-template-columns: 4rem 6rem repeat(50, 1fr);
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 4rem 6rem repeat(50, 1fr);
  grid-template-rows: 1.5rem;
}

.td.data {
  grid-row: 1;
  background-color: rgba($color: $blue100, $alpha: 1);
  text-align: center;
}
</style>
