<script setup>

// const handleLocation = (e) => {
//     console.log('handleLocation', e)
// }

 // Define the function in the global scope
        function handleLocation() {
            console.log("Button clicked! Handling location...");
            // Your actual location handling logic here
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("Latitude:", position.coords.latitude);
                        console.log("Longitude:", position.coords.longitude);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        }

</script>

<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Where are we going?</h1>
        <form action="#">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input
                            placeholder="My destination"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm">
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button onclick="handleLocation()" class="inline-flex justify-center rounded-md border-transparent bg-black text-white py-2 px-4">
                    Find a Ride
                </button>
            </div>
        </form>
    </div>
</template>