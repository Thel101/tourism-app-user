<template>
    <Banner :src="'/assets/images/plan1.jpeg'" :text="headerText"></Banner>
    <div height="600px" v-if="showAlert" class="d-flex justify-center text-green">
        <v-card elevation="12" class="mx-auto my-8 text-green" max-width="544">
            <v-card-title class="d-flex align-center">
                <v-icon>mdi-check-circle-outline</v-icon>
                <span class="ml-2">User Registered Successfully!</span>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer> <!-- Add a spacer to push the button to the right -->
                <v-btn flat @click="clearData">Close</v-btn>
            </v-card-actions>
        </v-card>



    </div>
    <div v-else>
        <v-container fluid class="mt-5">

            <v-row justify="center">
                <v-col cols="12" md="6" sm="9">
                    <v-card elevation="12" class="px-3">
                        <h2 class="text-center my-3 text-blue-accent-2">Register your account</h2>
                        <v-form class="py-5" @submit.prevent="authStore.submitForm(form)">
                            <v-text-field name="username" v-model="form.name" label="Username" />
                            <span v-if="this.authStore.errors.name" class="text-red">{{ this.authStore.errors.name[0] }}</span>

                            <v-text-field type="email" v-model="form.email" label="Email" />
                            <span v-if="this.authStore.errors.email" class="text-red">{{ this.authStore.errors.email[0] }}</span>

                            <v-text-field v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'" hint="At least 8 characters"
                                label="Normal with hint text" @click:append="show1 = !show1"></v-text-field>
                                <span v-if="this.authStore.errors.password" class="text-red">{{ this.authStore.errors.password[0] }}</span>

                            <v-text-field v-model="form.confirm_password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'" label="Confirm password"
                                @click:append="show1 = !show1"></v-text-field>
                               
                            <v-btn block color="blue-accent-2" type="submit">Register</v-btn>
                        </v-form>
                    </v-card>
                </v-col>

            </v-row>

        </v-container>
    </div>
</template>

<script>

import Banner from '../components/Banner.vue';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
export default {
    components: {
        Banner
    },
    setup() {
        const showAlert = ref(false);
        const errors = ref({});
        const authStore = useAuthStore();
        const form = ref({
            name : "",
            email : "",
            password : "",
            confirm_password: ""
        })
       
        const show1 = ref(false);
        const headerText = ref('Explore Around Asia');
        
        const clearData = () => {
            showAlert.value = !(showAlert.value);
            form.name = "";
            form.email = "";
            form.password = "";
            form.confirm_password = "";
            errors.value = "";
        }
        return { errors, headerText, form, show1, showAlert, authStore, clearData }
    }
}
</script>

<style></style>