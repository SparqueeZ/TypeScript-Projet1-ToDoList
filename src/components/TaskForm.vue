<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Task name" v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'

const newTask = ref('')

const taskStore = useTaskStore()

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      name: newTask.value,
      isDone: false,
      id: `${taskStore.totalCount + 1}`
    })
    newTask.value = ''
  }
}
</script>

<style lang="scss" scoped>
form {
  padding: 2rem 3rem;
  background-color: var(--color-background-mute);
  width: 100%;
  display: flex;
  margin: 1rem 0;
  input {
    width: 80%;
    border: none;
    outline: none;
    padding: 1rem;
    background-color: transparent;
  }
  button {
    width: 20%;
    border: none;
    background-color: var(--color-background);
    transition: 0.2s ease-out;
    &:hover {
      background-color: var(--vt-c-divider-light-2);
      cursor: pointer;
    }
  }
}
</style>
