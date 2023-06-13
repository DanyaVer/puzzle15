<script>
import { moveCell } from "../gameLogic/CellMoving";
import { checkFieldState } from "../gameLogic/Field"
export default {
  props: ["field", "running"],

  methods: {
    moveCell,

    cellClick(index, field) {
      if (this.running) {
        this.moveCell(index, field);
        if (checkFieldState(field)) this.$emit("win");
      }
    },
  },
};
</script>

<template>
  <div class="cell-container">
    <div
      v-for="(cellNumber, index) in field.cells"
      :key="cellNumber"
      class="cell"
      @click="cellClick(index, field)"
      :class="{ empty: cellNumber === 0, correct: cellNumber === index + 1, cellOutline: true }"
    >
      <div v-if="cellNumber > 0" class="number">{{ cellNumber }}</div>
    </div>
  </div>
</template>

<style scoped>

.cell-container {
  max-width: 600px;
  max-height: 600px;
  width: calc(100% - 5px);
  height: calc(100% - 5px);
  padding: 5px;
  margin-bottom: 1rem;

  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 5px;
}

.cell {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: wheat;
  border-radius: 2px;
  border: 2px solid #000000;
  &.empty {
    background-color: lightgrey;
    opacity: 0.7;
  }
  &.correct {
    background-color: lightgreen;
  }
}
</style>