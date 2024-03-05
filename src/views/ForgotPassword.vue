<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="6" sm="9">
                <v-card elevation="12" class="px-3">
                    <h2 class="text-center my-3 text-blue-accent-2">Login Your Account</h2>
                    <v-form class="py-5">

                        <v-text-field v-model="form.email" label="Email"></v-text-field>
                        <span class="text-red" v-if="this.authStore.errors.email">{{ this.authStore.errors.email[0]
                            }}</span>


                        <v-btn block color="blue-accent-2" @click="authStore.logIn(form)">Login</v-btn>
                    </v-form>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

export default {
    setup() {
        const email = ref("");
        const authStore = useAuthStore();
        return { email, authStore }
    }

}
</script>

<style></style>