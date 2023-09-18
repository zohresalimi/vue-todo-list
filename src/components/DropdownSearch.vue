<template>
    <div class="relative" v-if="searchTerm">
        <div class="absolute w-full overflow-hidden -top-2 shadow-lg overflow-hidden rounded-b-lg">
            <div v-if="searchResult.data?.results?.length" 
                class="bg-white border-sky-300 border border-t-0 flex flex-col items-center">
                <div class="w-11/12 border-t"></div>
                <ul class="divide-y flex-1 w-full">
                    <li 
                        class="h-8 flex items-center px-5 py-5 pr-2 cursor-pointer 
                            flex justify-between items-center
                            hover:bg-sky-50 transition-all" 
                            v-for="(item, index) in searchResult.data.results" :key="index"
                            @click="emitHandleItemSelect(item.name)">
                        <span>
                            {{ item.name }}
                        </span>
                        <span v-if="isLoadingPlanets">
                            <Loading />
                        </span>
                        <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                            {{ planets.get(item.homeworld)?.name }}
                        </span>
                    </li>
                </ul>
            </div>

            <div v-if="isLoadingPeople || searchResult.data?.results" 
                class="flex justify-between bg-sky-50 py-3 px-6 border border-t-0 border-sky-300 rounded-lg rounded-t-none overflow-hidden">
                <button v-if="searchResult.data?.results?.length" class="transition-all duration-400 cursor-pointer block px-5 rounded py-1 bg-sky-100 hover:bg-sky-200 disabled:bg-transparent" :disabled="isLoadingPeople || !searchResult.data.previous" @click.prevent="loadPreviousPage" :href="searchResult.data.previous">Prev</button>
                <div class="flex items-center justify-center">
                    <span v-if="isLoadingPeople">Loading...</span>
                    <span v-else-if="searchResult.data && !searchResult.data?.results?.length">No one found</span>
                </div>
                <button v-if="searchResult.data?.results?.length" class="transition-all duration-400 cursor-pointer block px-5 rounded py-1 bg-sky-100 hover:bg-sky-200 disabled:bg-transparent" :disabled="isLoadingPeople || !searchResult.data.next" @click.prevent="loadNextPage" :href="searchResult.data.next">Next</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useDebounce from '@/composables/useDebounce'
import Loading from '@/components/Loading.vue'
import { onMounted, reactive, ref, watch } from 'vue';

const searchResult = reactive<{
    data?: SearchResuntData
}>({})

const planets = ref<Map<string, any>>(new Map())
const isLoadingPeople = ref(false)
const isLoadingPlanets = ref(false)

const props = defineProps({
    searchTerm: {
        required: true,
        type: String
    }
})
const emit = defineEmits(['itemSelected'])

const emitHandleItemSelect = (item: string) => {
    emit('itemSelected', item)
}

const loadplanets = async () => {
    let planetsList: any[] = []

    const persistedPlanets = localStorage.getItem('planets')
    if(!persistedPlanets) {
        isLoadingPlanets.value = true
        try {
            const planetCalls = [1,2,3,4,5,6].map(async (pageNumber)=>{
                const res = await fetch(`https://swapi.dev/api/planets?page=${pageNumber}`) 
                return res.json()
            })
        
            const responses = await Promise.all(planetCalls)
            planetsList = responses.reduce((acc, currentPage) => {
                return [
                    ...acc,
                    ...currentPage.results
                ];
            }, [])

            localStorage.setItem('planets', JSON.stringify(planetsList))
        } catch(error: any) {
            console.log('Error occured while fetching planets')
        }
        finally{
            isLoadingPlanets.value = false
        }
    } else {
        planetsList = JSON.parse(persistedPlanets)
    }

    planetsList.forEach((planet) => {
        planets.value.set(planet.url, planet)
    })
}

const loadNextPage = () => {
    loadMoreResult('next')
}

const loadPreviousPage = () => {
    loadMoreResult('previous')
}

const loadMoreResult = async (strategy: string) => {
    if(!searchResult.data?.[strategy]) return;
    try {
        isLoadingPeople.value = true;
        const response = await fetch(searchResult.data?.[strategy])
            .then(response => response.json())
        searchResult.data = response;
    } catch(error: any) {
        console.log('Error while fetching more results', props.searchTerm, error)
    } finally {
        isLoadingPeople.value = false;
    }
}

const searchCharacters = async (searchTerm: string) => {
    searchResult.data = {}
    try {
        isLoadingPeople.value = true;

        const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
            .then(response => response.json())
        searchResult.data = response;
    } catch(error: any) {
        console.log('Error occured while fetching people', searchTerm, error)
    } finally {
        isLoadingPeople.value = false
    }
}

const { debounced: debouncedSearch } = useDebounce(searchCharacters, 500)


watch(
    () => props.searchTerm, 
    (updatedTerm, oldTerm, onCleanup) => {
        if(updatedTerm !== oldTerm){
            debouncedSearch(updatedTerm)
        }

        onCleanup(() => {
            searchResult.data = {}
        })
    }
)

onMounted(() => {
    loadplanets()
})
</script>