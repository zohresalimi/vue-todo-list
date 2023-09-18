<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import TodoInput from "./TodoInput.vue";
import TodoItem from "./TodoItem.vue";

type TodoType = {
    content: string,
    done: boolean,
    id: number
}

const todos = ref<TodoType[]>([])

const searchQuery = ref<HTMLInputElement>();

onMounted(() => {
    searchQuery?.value?.focus()
    todos.value = JSON.parse(localStorage.getItem('todos') || '[]')
})

watch(todos, (updatedTotos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTotos))
}, {
    deep: true
})

const addTodo = (content: string) =>{
    if(content.trim() === '') return
    todos.value.push({
        content,
        done: false,
		id: new Date().getTime()
    })
}

const removeTodo = (todoId: number) => {
	todos.value = todos.value.filter((t) => t.id !== todoId)
}

const changeTodoStatus = (todoId: number) => {
    todos.value = todos.value.map(todo => {
        if(todo.id === todoId) {
            todo.done = !todo.done
        }
        return todo
    })
}
</script>

<template>
    <div class="flex justify-center items-baseline h-full pt-4 sm:p-16">
        <div class="w-[40rem] h-full m-4 flex flex-col">
            <div class="title-wrapper w-full mb-3 flex justify-center items-center">
                <h1 class="title-typing text-lg text-sky-600">
                    Just do it!
                </h1>
            </div>
    
            <TodoInput @addTodo="addTodo" />

            <div v-if="todos.length"
                class="box-container border border-gray-200 shadow-lg rounded-lg divide-y mt-8">
                
                <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @removeTodo="removeTodo" @updateStatus="changeTodoStatus" />
            </div>
        </div>
    </div>
</template>

<style scoped>



.title-typing {
  width: 11ch;
  font-size: 25px;
  animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
}

@keyframes typing {
  from {
    width: 0
  }
}
    
@keyframes blink {
  50% {
    border-color: transparent
  }
}

form {
    font-size: 1.7rem;
    margin: 15px 0;
    width: 100%;
}
.search-input{
    padding: 12px;
    font-size: 17px;
    outline: none;
    max-width: 700px;
    transition: background-color 200ms ease-in-out;
    width: 100%;
}

.add-action {
    padding: 9px;
    font-size: 17px;
    min-width: 100px;
}


</style>
