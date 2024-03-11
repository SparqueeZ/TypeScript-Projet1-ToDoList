import { defineStore } from 'pinia'

interface Task {
  id: number
  name: string
  done: boolean
}

export const useTaskStore = defineStore('taskStore', {
  state: (): { tasks: Task[]; name: string } => ({
    tasks: [
      { id: 1, name: 'Anglais', done: false },
      { id: 2, name: 'Francais', done: true }
    ],
    name: 'Langues apprises'
  }),
  getters: {
    done(state): Task[] {
      return this.tasks.filter((t) => t.done)
    },
    doneCount(state) {
      return this.tasks.reduce((p, c) => {
        return c.done ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  }
})
