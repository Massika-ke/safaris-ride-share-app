<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const findRide = () => {
    router.push({
        name: 'location'
    })
}

</script>

<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Safiri</h1>
        <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
            <div class="bg-white px-4 py-5 sm:p-6">
                <div class="flex justify-between">
                    <button 
                    class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white">
                        Start Driving
                    </button>
                    <button 
                        @click="findRide"
                        class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white">
                        Find A Ride
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>