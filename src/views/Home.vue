<template>
  <div class="home">
    <div class="form">
      <p>
        Vali või sisesta kuni kümneelemendiline järjend kujul "3,5;2,5; ...
        ;9,2"
      </p>
      <div class="inputs">
        <label>
          <input
            type="radio"
            name="Esimene"
            id="esimene"
            :value="defaultArrays[0]"
            v-model="formData.selectedArray"
          />Esimene
        </label>
        <span>{{ parseArrayToString(defaultArrays[0]) }}</span>
        <label>
          <input
            type="radio"
            name="Teine"
            id="teine"
            :value="defaultArrays[1]"
            v-model="formData.selectedArray"
          />Teine
        </label>
        <span>{{ parseArrayToString(defaultArrays[1]) }}</span>
        <label>
          <input
            type="radio"
            name="Kolmas"
            id="kolmas"
            :value="defaultArrays[2]"
            v-model="formData.selectedArray"
          />Kolmas
        </label>
        <span>{{ parseArrayToString(defaultArrays[2]) }}</span>
        <label>
          <input
            type="radio"
            name="Enda"
            id="enda"
            :value="parsedCustomArray"
            v-model="formData.selectedArray"
          />Enda oma
        </label>
        <input
          type="text"
          placeholder="sisesta järjend"
          v-model="formData.customArray"
        />
      </div>
      <p>{{ parsedCustomArray }}</p>
      <p>Algoritmi käivitamiseks klõpsa nupule</p>
      <div class="buttons">
        <button @click="firstFit()">First-fit</button>
        <button @click="lastFit()">Last-fit</button>
        <button @click="worstFit()">Worst-fit</button>
        <button @click="randomFit()">Random-fit</button>
        <button @click="clearGraph()">Puhasta väljund</button>
      </div>
    </div>
    <Graph
      :inputArray="inputArray"
      :usedAlgorithm="usedAlgorithm"
      :processes="processes"
    />
  </div>
</template>

<script>
import Graph from "@/components/Graph.vue";
import { firstFitFunctionWrapper } from "@/js/firstFitFunction.js";

export default {
  name: "Home",
  components: { Graph },
  data: function () {
    return {
      defaultArrays: [
        [
          [4, 5],
          [2, 7],
          [9, 2],
          [4, 6],
          [7, 1],
          [6, 4],
          [8, 8],
          [3, 6],
          [1, 10],
          [9, 2],
        ],
        [
          [1, 10],
          [6, 6],
          [3, 9],
          [2, 4],
          [1, 6],
          [5, 2],
          [1, 4],
          [5, 2],
          [2, 1],
          [2, 7],
        ],
        [
          [5, 10],
          [6, 6],
          [3, 9],
          [8, 4],
          [3, 6],
          [5, 12],
          [1, 4],
          [15, 3],
          [3, 4],
          [9, 7],
        ],
      ],
      formData: {
        selectedArray: null,
        customArray: "",
      },
      inputArray: null,
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      usedAlgorithm: null,
      processes: [],
    };
  },
  methods: {
    parseArrayToString: function (array) {
      let parsedString = "";

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index == array.length - 1) {
          parsedString += element[0] + "," + element[1];
        } else {
          parsedString += element[0] + "," + element[1] + ";";
        }
      }

      return parsedString;
    },
    clearGraph: function () {
      this.inputArray = null;
      this.usedAlgorithm = undefined;
    },
    firstFit: function () {
      console.log("First-Fit algorithm initiated.");
      this.usedAlgorithm = "First-Fit";
      this.processes = [...this.formData.selectedArray];
      let arr = firstFitFunctionWrapper([...this.formData.selectedArray]);
      this.inputArray = [...arr.result];
    },
  },
  computed: {
    parsedCustomArray: function () {
      let re = /^(\d+,\d+;?)+$/g;

      if (
        re.test(this.formData.customArray) &&
        !this.formData.customArray.endsWith(";")
      ) {
        let array = this.formData.customArray.split(";");
        array = array.map((element) => {
          return element.split(",").map(Number);
        });

        if (array.length > 10) return "Array is too long";
        return array;
      }

      return "Input doesn't match the pattern";
    },
  },
};
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 2rem;
  box-shadow: 0 0 10px 0 rgba($color: $grey500, $alpha: 0.5);
}

.inputs {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.25rem;

  label {
    display: flex;
    column-gap: 0.25rem;
    align-items: center;
  }

  input[type="text"] {
    padding: 0.25rem;
    font-size: 0.875rem;
    border: 1px solid $grey500;
  }

  span {
    background-color: $grey200;
    padding: 0.25rem;
    font-size: 0.875rem;
    border: 1px solid $grey400;
  }
}

.buttons {
  display: flex;
  column-gap: 0.5rem;
}

button {
  padding: 0.25rem;
  border: 1px solid $grey500;
}
</style>
