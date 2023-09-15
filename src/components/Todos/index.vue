<script setup lang="ts">

</script>

<template>
    <div class="flex justify-center items-baseline h-full pt-4 sm:p-16">
        <div class="w-[40rem] h-full m-4 flex flex-col">
            <div class="title-wrapper w-full mb-3 flex justify-center items-center">
                <h1 class="title-typing text-lg text-sky-600">
                    Just do it!
                </h1>
            </div>
            <div class="content-wrapper" >
                <form action="" class="flex justify-center items-center">
                        <input class="search-input placeholder:italic placeholder:text-slate-400 block bg-white w-full border-t border-b border-l border-sky-500 rounded-l-2xl 
                            shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 
                            sm:text-sm" placeholder="Search for your Star Wars character ..." type="text" name="search"/>

                        <button class="add-action rounded-r-2xl bg-white border border-sky-600 shadow-sm hover:text-white hover:bg-sky-600">Add</button>
                </form>
                <div class="box-container border border-sky-500 shadow-sm rounded-2xl divide-y mt-14">
                    <div class="todo-list flex justify-center items-center p-3">
                        <p class="todo-item flex-1"> first todo-list</p>
                        <button class="check-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 mr-2 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="check"/>
                        </button>
                        <button class="delete-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="trash"/>
                        </button>
                    </div>

                    <div class="todo-list flex justify-center items-center p-3">
                        <p class="todo-item flex-1"> first todo-list</p>
                        <button class="check-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 mr-2 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="check"/>
                        </button>
                        <button class="delete-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="trash"/>
                        </button>
                    </div>

                    <div class="todo-list flex justify-center items-center p-3">
                        <p class="todo-item flex-1"> first todo-list</p>
                        <button class="check-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 mr-2 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="check"/>
                        </button>
                        <button class="delete-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="trash"/>
                        </button>
                    </div>

                    <div class="todo-list flex justify-center items-center p-3">
                        <p class="todo-item flex-1"> first todo-list</p>
                        <button class="check-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 mr-2 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="check"/>
                        </button>
                        <button class="delete-btn text-sky-600 text-lg border rounded-full w-[35px] h-[35px] border-sky-600 hover:text-white hover:bg-sky-600">
                            <font-awesome-icon icon="trash"/>
                        </button>
                    </div>

                </div>
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
