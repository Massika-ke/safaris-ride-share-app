<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
        <form action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="## ########" v-model="credentials.phone" name="phone" placeholder="xx xxxxxxxx"
                        class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm">
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" @submit="handleLogin" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white">
                        Continue
                    </button>
                </div>
            </div>
        </form>
    </div>

</template>

<script setup>
import axios from "axios"
import { vMaska } from "maska/vue"
import { reactive } from "vue"


const credentials = reactive({
phone:null
})


const handleLogin = () => {
    axios.post('http://backend.test/api/login', {
        phone: credentials.phone.replaceAll(' ', '').replace('(', '').replace(')', '').replace('-', '')
    })
    .then((response)=> {
        console.log(response.data)
    })
    .catch((error)=> {
        console.error(error)
        alert(error.response.message)
    })
}

</script>