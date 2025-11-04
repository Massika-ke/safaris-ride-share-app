<!-- <script setup>
import { useLocationStore } from '@/stores/location';



const location = useLocationStore()

const handLocationChanged = (e) => {
    console.log('handLocationChanged', e)
    location.$patch({
        destination: {
            name: e.name,
            address: e.formatted_address,
            geometry: {
                lat: e.geometry.location.lat(),
                lng: e.geometry.location.lng()
            }
        }
    })
}

</script>

<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Where are we going?</h1>
        <form action="#">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapAutocomplete 
                            placeholder="My destination"
                            @place_changed="handLocationChanged"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm">
                        </GMapAutocomplete>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="button" class="inline-flex justify-center rounded-md border-transparent bg-black text-white py-2 px-4">
                    Find a Ride
                </button>
            </div>
        </form>
    </div>
</template> -->



<script setup>
import { ref } from 'vue';
import { useLocationStore } from '@/stores/location';

const location = useLocationStore();
const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const showResults = ref(false);

// Debounce function
let debounceTimer;
const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};

// Search using Nominatim (OpenStreetMap's geocoding service)
const searchLocation = debounce(async () => {
    if (searchQuery.value.length < 3) {
        searchResults.value = [];
        showResults.value = false;
        return;
    }

    isSearching.value = true;
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `format=json&q=${encodeURIComponent(searchQuery.value)}` +
            `&limit=5&addressdetails=1`,
            {
                headers: {
                    'Accept-Language': 'en-US,en;q=0.9'
                }
            }
        );
        
        const data = await response.json();
        searchResults.value = data;
        showResults.value = true;
    } catch (error) {
        console.error('Search error:', error);
        searchResults.value = [];
    } finally {
        isSearching.value = false;
    }
}, 500);

const selectLocation = (place) => {
    searchQuery.value = place.display_name;
    showResults.value = false;
    
    location.$patch({
        destination: {
            name: place.name || place.display_name.split(',')[0],
            address: place.display_name,
            geometry: {
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon)
            }
        }
    });
};

const handleInput = () => {
    searchLocation();
};

const handleBlur = () => {
    // Delay to allow click on results
    setTimeout(() => {
        showResults.value = false;
    }, 200);
};
</script>

<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Where are we going?</h1>
        <form action="#" @submit.prevent>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            @input="handleInput"
                            @focus="showResults = searchResults.length > 0"
                            @blur="handleBlur"
                            type="text"
                            placeholder="My destination"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        
                        <!-- Loading indicator -->
                        <div v-if="isSearching" class="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>

                        <!-- Search results dropdown -->
                        <div 
                            v-if="showResults && searchResults.length > 0"
                            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                        >
                            <button
                                v-for="place in searchResults"
                                :key="place.place_id"
                                type="button"
                                @click="selectLocation(place)"
                                class="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-0 transition-colors"
                            >
                                <div class="font-medium text-sm text-gray-900">
                                    {{ place.name || place.display_name.split(',')[0] }}
                                </div>
                                <div class="text-xs text-gray-500 mt-1">
                                    {{ place.display_name }}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button 
                    type="button" 
                    class="inline-flex justify-center rounded-md border-transparent bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!location.destination"
                >
                    Find a Ride
                </button>
            </div>
        </form>
    </div>
</template>