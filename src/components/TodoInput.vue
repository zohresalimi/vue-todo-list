<template>
    <form @submit.prevent="addTodo" class="flex justify-center items-center">
        <input class="search-input placeholder:italic placeholder:text-slate-400 block bg-white w-full border-t border-b border-l border-sky-500 rounded-l-2xl 
            shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 
            sm:text-sm" 
            placeholder="Search for your Star Wars character ..." 
            type="text" 
            name="search"
            ref="searchQuery" 
            @input="debouncedCharSearch"
            v-model="todoContent" />
        <button type="submit" class="add-action rounded-r-2xl bg-white border border-sky-600 shadow-sm hover:text-white hover:bg-sky-600">Add</button>
    </form>

    <DropdownSearch :searchTerm="searchTerm" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import DropdownSearch from '@/components/DropdownSearch.vue'

const todoContent = ref('')

const emit = defineEmits(['addTodo'])

const addTodo = () => {
    emit('addTodo', todoContent.value)
}

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