<template>
  <h3>{{ task.name }}</h3>
  <div class="commands">
    <button @click="handleRemove" class="removeBtn">Remove</button>
    <div @click="handleDone" class="indicator" :class="task.isDone ? 'done' : 'todo'"></div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { defineProps } from 'vue'

const taskStore = useTaskStore()
interface Task {
  name: string
  isDone: boolean
  id: string
}
const props = defineProps<{
  task: Task
}>()

const handleRemove = () => {
  taskStore.deleteTask(props.task.id)
}
const handleDone = () => {
  taskStore.toggleDone(props.task.id)
}
</script>

<style lang="scss" scoped>
.commands {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
}
</style>
