<script setup>
import { useLocationStore } from '@/stores/location';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const location = useLocationStore()
const router = useRouter()

onMounted( async()=> {
    // does the user have a location set?
    if (location.destination.name === '') {
        router.push({
            name: 'location'
        })
    }

    // getting the users current location
    await location.updateCurrentLocation()
})

</script>

<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Here's your Trip</h1>
        <div>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapMap :zoom="11" :center="location.destination.geometry" style="width: 100%; height: 256px;">
                        </GMapMap>
                    </div>
                    <div class="mt-2">
                        <p class="text-xl">Going to <strong>{{ location.destination.name }}</strong></p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button class="inline-flex justify-center rounded-md border border-transparent bg-black py-3">
                        Lets Go
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>