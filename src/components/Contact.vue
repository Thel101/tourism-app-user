<template>
     <v-alert v-if="showDialog" color="green" class="my-5">
            <div class="d-flex justify-lg-space-between">
                <div>
                    {{ message }}
                </div>
                <div>
                    <v-icon color="white" @click="showDialog = !showDialog">mdi-close</v-icon>
                </div>

            </div>
        </v-alert>
    
    <div class="mt-10">
        <h1 class="contact text-center text-blue-grey mb-5">Reach out to Us</h1>
        <v-card flat>
            <div class="d-lg-flex fill-height align-center">
                <div style="margin: 0; padding: 0; min-width:50%;">
                    <div class="blue lighten" style="height: 50vh;">
                        <img src="/assets/images/contactus1.jpeg" alt=""
                            style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>

                <div class="ml-lg-10" style="min-width: 40%;">
                    <v-card class="px-3" flat>
                        <v-form>
                            <v-row>
                                <v-col>
                                    <v-text-field variant="underlined" v-model="name" label="Name"
                                        class="mr-3"></v-text-field>
                                    <span v-if="errors && errors.name" class="text-red">{{ errors.name[0] }}</span>

                                </v-col>
                                <v-col>
                                    <v-text-field variant="underlined" v-model="email" label="Email"></v-text-field>
                                    <span v-if="errors && errors.email" class="text-red">{{ errors.email[0] }}</span>
                                </v-col>

                            </v-row>

                            <v-text-field type="tel" variant="underlined" v-model="phone" label="Phone"></v-text-field>
                            <span v-if="errors && errors.phone" class="text-red">{{ errors.phone[0] }}</span>

                            <v-select v-model="reason" :items="reasons" label="Reasons for inqury"></v-select>
                            <span v-if="errors && errors.reason" class="text-red">{{ errors.reason[0] }}</span>

                            <v-textarea variant="underlined" v-model="comment"
                                label="Please tell us your concern"></v-textarea>
                            <span v-if="errors && errors.comments" class="text-red">{{ errors.comments[0] }}</span>
                            <div class="d-flex justify-end">
                                <v-btn @click="sendContact" color="blue">Send Inquiry</v-btn>
                            </div>
                        </v-form>
                    </v-card>

                </div>

            </div>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
    setup() {
        const name = ref('');
        const email = ref('');
        const phone = ref('');
        const reason = ref('');
        const comment = ref('');
        const reasons = ref([
            'inquiry',
            'plans',
            'price information',
            'destinations'
        ])
        const errors = ref({});
        const showDialog = ref(false);
        const message = ref('');
        const sendContact = () => {
            axios.post('http://tourism-app-backend.test/api/contact/create', {
                'name': name.value,
                'email': email.value,
                'phone': phone.value,
                'reason': reason.value,
                'comments': comment.value
            })
                .then(function (response) {
                    if (response.status === 200) {
                        name.value = '';
                        email.value = '';
                        phone.value = '';
                        reason.value = '';
                        comment.value = '';
                        showDialog.value = true;
                        message.value = response.data.message
                        console.log(message.value)
                    }


                })
                .catch(function (error) {
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors;
                        console.log(error)
                    }

                })

        }
        return { sendContact, reasons, name, email, phone, reason, comment, errors, showDialog, message }
    }
}
</script>

<style></style>