<template>
    <div v-if="isLoading">Loading...</div>
    <div v-if="!isLoading && searchResult.data">
        <ul>
            <li v-for="(item, index) in searchResult.data.results" :key="index">
                {{ item.name }}
            </li>
        </ul>

        <div>
            <a :disabled="!searchResult.data.next" @click.prevent="loadNextPage" :href="searchResult.data.next">Next</a>
            <a :disabled="!searchResult.data.previous" @click.prevent="loadPreviousPage" :href="searchResult.data.previous">Prev</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useDebounce from '@/composables/useDebounce'
import { reactive, ref, watch } from 'vue';

const searchResult = reactive<{
    data?: SearchResuntData
}>({})

const isLoading = ref(false)

const props = defineProps({
    searchTerm: {
        required: true,
        type: String
    }
})

const loadNextPage = () => {
    loadMoreResult('next')
}

const loadPreviousPage = () => {
    loadMoreResult('previous')
}

const loadMoreResult = async (strategy: string) => {
    if(!searchResult.data?.[strategy]) return;
    try {
        isLoading.value = true;
        const response = await fetch(searchResult.data?.next)
            .then(response => response.json())
        searchResult.data = response;
    } catch(error: any) {
        console.log('Error while fetching more results', props.searchTerm, error)
    } finally {
        isLoading.value = false;
    }
}

const searchCharacters = async (searchTerm: string) => {
    try {
        isLoading.value = true;

        const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
            .then(response => response.json())
        searchResult.data = response;
    } catch(error: any) {
        console.log('Error occured while fetching people', searchTerm, error)
    } finally {
        isLoading.value = false
    }
}

const { debounced: debouncedSearch } = useDebounce(searchCharacters, 500)

watch(props, (updatedProps) => {
    if(updatedProps.searchTerm){
        debouncedSearch(updatedProps.searchTerm)
    }
})
</script>