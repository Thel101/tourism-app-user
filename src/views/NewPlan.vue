<template>
    <h1>Hello {{ name.value }}</h1>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
export default {
    setup() {
        const name = ref('');
        const getUser = () => {
            axios.get('http://tourism-app-backend.test/api/user',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials : true,
                },
            ).then(response => {
                // Verify the structure of the response data
                if (response.data && response.data.name) {
                    // Assign the name property to the Vue component's data
                    this.name = response.data.name;
                    console.log(this.name);
                } else {
                    console.error('Name not found in response data:', response.data);
                }
            })
                .catch(error => {
                    console.error('Error fetching user:', error);
                    // Handle error appropriately, e.g., display an error message
                });
        }
        onMounted(() => {
            getUser();
        })
        return { name, getUser }
    }
}
</script>

<style></style>