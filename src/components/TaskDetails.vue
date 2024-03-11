<template>
  <h3>{{ task.name }}</h3>
  <div class="indicator" :class="task.done ? 'done' : 'todo'"></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Task {
  name: string
  done: boolean
}
const props = defineProps<{
  task: Task
}>()
</script>

<style lang="scss" scoped>
.indicator {
  width: 1rem;
  height: 1rem;

  &.done {
    background-color: green;
  }

  &.todo {
    background-color: red;
  }
}
</style>
