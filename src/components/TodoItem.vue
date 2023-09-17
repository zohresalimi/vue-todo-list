<template>
    <div class="todo-list flex justify-center items-center p-3">
        <p class="todo-item flex-1"
            :class="{'line-through':todo.done}"> {{ todo.content }}</p>

        <input type="checkbox" class="w-6 h-6 border rounded-full cursor-pointer border-sky-600 text-sky-600 mr-2 focus:ring-0 focus:ring-offset-0 focus:shadow-none"
            v-model="todoStatus">

        <button 
            class="delete-btn text-sky-600 border rounded-full w-6 h-6 border-sky-600 hover:text-white hover:bg-sky-600"
            @click="emitItemRemove">
            <font-awesome-icon icon="trash" />
        </button>
    </div> 
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['todo'])

const emit = defineEmits(['removeTodo', 'updateStatus'])

const emitItemRemove = () => {
    emit('removeTodo', props.todo.id)
}

const todoStatus = computed({
    get() {
        return props.todo.done
    },

    set() {
        emit('updateStatus', props.todo.id)
    }
})
</script>