<template>
  <div class="title">{{ taskStore.name }}</div>

  <TaskForm />

  <nav class="filter">
    <button @click="filter = 'all'">All tasks</button>
    <button @click="filter = 'done'">Done tasks</button>
  </nav>

  <section class="errorMessage" v-if="taskStore.errorMessage">
    <p>{{ taskStore.errorMessage }}</p>
  </section>

  <section class="loading" v-if="taskStore.loading">
    <p>Loading Tasks ...</p>
  </section>

  <section v-if="!taskStore.loading && !taskStore.errorMessage">
    <section v-if="filter === 'all'" class="tasks-container">
      <p>All tasks ({{ taskStore.totalCount }})</p>
      <div class="task" v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </section>

    <section v-if="filter === 'done'" class="tasks-container">
      <p>Done tasks ({{ taskStore.doneCount }})</p>
      <div class="task" v-for="task in taskStore.done" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </section>
  </section>
</template>

<script setup>
import TaskDetails from '@/components/TaskDetails.vue'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
const taskStore = useTaskStore()

taskStore.getTasks()

const filter = ref('all')
</script>

<style lang="scss" scoped>
.title {
  font-size: 42px;
  text-align: center;
}

.filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  // background-color: var(--color-background-soft);
  button {
    background-color: var(--color-background-mute);
    border: none;
    color: var(--color-text);
    padding: 1rem 2rem;
    border-radius: 0.3rem;

    &:hover {
      background-color: var(--color-background-soft);
      cursor: pointer;
    }
  }
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .task {
    background-color: var(--color-background-mute);
    width: 100%;
    padding: 2rem 4rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
