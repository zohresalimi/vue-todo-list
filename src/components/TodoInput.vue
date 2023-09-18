<template>
    <form @submit.prevent="addTodo" class="flex justify-center items-center shadow-lg overflow-hidden rounded-lg">
        <input class="search-input placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-sky-300 
            rounded-lg rounded-r-none
            focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 
            sm:text-sm h-14"
            placeholder="Search for your Star Wars character ..." 
            type="text" 
            name="search"
            autocomplete="off"
            ref="searchQuery"
            v-model="todoContent" />
        <button type="submit" class="add-action rounded-r-lg bg-white 
            border border-l-0 h-14 border-sky-300
            px-5 transition-all
            hover:text-white hover:bg-blue-500">Add</button>
    </form>

    <DropdownSearch :searchTerm="searchTerm" @itemSelected="handleItemSelect"/>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import DropdownSearch from '@/components/DropdownSearch.vue'

// Refs for DOM elements and data
const searchQuery = ref<HTMLInputElement>()
const todoContent = ref('')

// Emit setup for custom event
const emit = defineEmits(['addTodo'])

// Function to handle adding a todo
const addTodo = () => {
    emit('addTodo', todoContent.value)
    todoContent.value = ''
}

// Function to handle item selection from the DropdownSearch component
const handleItemSelect = (charName:string) => {
    const inputContent = todoContent.value.split(' ')
    const wordsList = inputContent.map(word => {
        if (word.startsWith('@') && word.length >= 2) return charName
        return word
    })
    todoContent.value= wordsList.join(' ')
    searchQuery.value?.focus()
}

// Computed property for extracting the search term from input content
const searchTerm = computed(() => {
    const inputContent = todoContent.value.split(' ')
    const searchToken = inputContent.find(word => word.startsWith('@') && word.length >= 2)

    // User did not enter @+char
    // doing nothing and return
    if(!searchToken) return '';

    // We have a search term 
    return searchToken.replace('@', '')
})
</script>