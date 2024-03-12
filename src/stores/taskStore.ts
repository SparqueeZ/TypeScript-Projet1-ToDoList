import { defineStore } from 'pinia'

interface Task {
  id: string
  name: string
  isDone: boolean
}

interface TaskState {
  tasks: Task[]
  name: string
  loading: boolean
  errorMessage: string
}

export const useTaskStore = defineStore('taskStore', {
  state: (): TaskState => ({
    tasks: [],
    name: 'ToDoList',
    loading: true,
    errorMessage: ''
  }),
  getters: {
    done(): Task[] {
      return this.tasks.filter((t) => t.isDone)
    },
    doneCount(): number {
      return this.tasks.reduce((count, task) => (task.isDone ? count + 1 : count), 0)
    },
    totalCount(): number {
      return this.tasks.length
    }
  },
  actions: {
    async getTasks() {
      try {
        const response = await fetch('http://localhost:3000/tasks')
        const data = await response.json()

        this.tasks = data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.errorMessage = `Error when fetching data : ${error}`
      }
    },

    async addTask(task: Task) {
      this.tasks.push(task)

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.error) console.log(res.error)
    },

    async deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id
      })

      const res = await fetch(`http://localhost:3000/tasks/` + id, {
        method: 'DELETE'
      })

      if (res.error) console.log(res.error)
    },

    async toggleDone(id: string) {
      const task = this.tasks.find((t) => {
        return t.id === id
      })
      task.isDone = !task.isDone

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isDone: task.isDone }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.error) console.log(res.error)
    }
  }
})
