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
            v-for="(element, j) in convertedInput[i]"
            :key="'td' + i + '-' + j"
            class="td data"
            :class="element == 'T' ? 'full' : null"
            :style="{
              backgroundColor: colors[element],
            }"
          >
            {{
              element == null
                ? "-"
                : element == "T"
                ? "PROTSESS EI MAHU MÄLLU"
                : element
            }}
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
      colors: {
        A: "#59c3ad",
        B: "#69bd95",
        C: "#7bb57e",
        D: "#8dad69",
        E: "#9da35a",
        F: "#ad9850",
        G: "#ba8c4d",
        H: "#c48051",
        I: "#cb735a",
        J: "#cd6868",
      },
    };
  },
  computed: {
    convertedInput: function () {
      let returnArray = [];
      let inputArray = this.inputArray;

      for (let i = 0; i < inputArray.length; i++) {
        let cycleArray = inputArray[i];
        let returnCycleArray = [];

        if (cycleArray[0][0] == null) {
          returnCycleArray.push("T");

          returnArray.push(returnCycleArray);

          continue;
        }

        for (let j = 0; j < 50; j++) {
          let foundLetter = false;

          for (let k = 0; k < cycleArray.length; k++) {
            let cycleArrayElement = cycleArray[k];

            if (j >= cycleArrayElement[1] && j < cycleArrayElement[2]) {
              returnCycleArray.push(cycleArrayElement[0]);
              foundLetter = true;
              break;
            }
          }

          if (foundLetter == true) continue;

          returnCycleArray.push(null);
        }

        returnArray.push(returnCycleArray);
      }
      return returnArray;
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
  border: 1px solid rgba($color: $grey300, $alpha: 1);
  text-align: center;
}

.td.data.full {
  color: $white;
  background-color: $grey900;
  grid-column: 3 / span 50;
}
</style>
