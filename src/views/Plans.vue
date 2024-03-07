<template>
  <div class="plan-trip">
    <Banner :src="'/assets/images/plan1.jpeg'"></Banner>
    <h1 class="my-5 headline text-center text-decoration-underline text--darken-2">Plan your dream trip with us
    </h1>
    <transition name="alert">
      <v-alert v-model="show_toast" color="green">
        <div class="d-flex justify-space-around">
          <v-alert-title>Plan request submitted successfully!</v-alert-title>
          <v-btn flat @click="clearValues"><v-icon color="black">mdi-close-circle-outline</v-icon></v-btn>
        </div>

      </v-alert>
    </transition>

    <div v-if="message" class="text-red text-center">
      <span>{{ message }}</span>
      <v-btn flat @click="clearError"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
    </div>
    <v-row justify-lg="center">
      <v-col lg="8" md="12" sm="12">
        <v-stepper v-model="step" :items="items" show-actions color="blue">
          <template v-slot:item.1>
            <h3 class="text-h6">Personal Information</h3>

            <v-form @submit.prevent="submitForm">

              <br>
              <v-sheet border>
                <v-row class="py-5">
                  <v-col class="col-md-12 col-lg-4 col-sm-12 mx-2">
                    <v-text-field v-model="name" label="Name" class="required-field" required></v-text-field>
                    <span v-if="errors && errors.name" class="text-red">{{ errors.name[0] }}</span>
                  </v-col>

                  <v-col class="col-md-12 col-lg-4 col-sm-12 mx-2">
                    <v-text-field v-model="email" label="E-mail" required></v-text-field>
                    <span v-if="errors && errors.email" class="text-red">{{ errors.email[0] }}</span>
                  </v-col>
                  
                  <v-col class="col-md-12 col-lg-4 col-sm-12 mx-2">
                    <v-text-field v-model="phone" label="Phone Number" required></v-text-field>
                    <span v-if="errors && errors.phone_no" class="text-red">{{ errors.phone_no[0] }}</span>
                  </v-col>
                </v-row>



                <v-textarea class="mx-4" v-model="trip_details" label="Trip Details"></v-textarea>
                <span v-if="errors && errors.trip_details" class="text-red">{{ errors.trip_details[0] }}</span>
              </v-sheet>
            </v-form>
          </template>

          <template v-slot:item.2>
            <h3 class="text-h6">Trip Details</h3>

            <br>
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col class="col-md-12 col-lg-4 col-sm-12">
                  <v-text-field v-model="destination" label="Destination" required></v-text-field>
                  <span v-if="errors && errors.destination" class="text-red">{{ errors.destination[0] }}</span>
                </v-col>
                <v-col class="col-md-12 col-lg-4 col-sm-12">
                  <v-text-field type="date" v-model="travel_date" :min="current_date"
                    label="Preferred travel date"></v-text-field>
                  <span v-if="errors && errors.travel_date" class="text-red">{{ errors.travel_date[0] }}</span>
                </v-col>
                <v-col class="col-md-12 col-lg-4 col-sm-12">
                  <v-text-field type="number" v-model="traveller_count" label="Number of Travellers"
                    required></v-text-field>
                </v-col>

              </v-row>

              <v-combobox v-model="activity_interests" hint="Please select at least 2 options" :items="activities"
                label="Interest and activities" multiple chips persistent-hint class="my-3"></v-combobox>
              <v-combobox v-model="cultural_interests" hint="Please select at least 2 options" :items="interests"
                label="Cultural Interests" multiple chips persistent-hint class="my-3"></v-combobox>
              <v-select v-model="adventure_level" :items="adventure" label="Adventure Level"></v-select>
              <v-combobox v-model="additional_services" :items="additional" label="Additional Services" multiple
                chips></v-combobox>

            </v-form>

          </template>

          <template v-slot:item.3>
            <h3 class="text-h6">Preferences</h3>

            <br>
            <v-form @submit.prevent="submitForm">
              <v-select v-model="selected_accomodation" :items="accomodation"
                label="Accomodation Preferences"></v-select>
              <v-select v-model="selected_room" :items="room" label="Room Configuration"></v-select>
              <v-combobox v-model="culinary_request" :items="culinary" label="Culinary Preferences" multiple
                chips></v-combobox>
              <v-select v-model="occasion_pref" :items="occasion" label="Occasional Preferences"></v-select>
              <v-row>
                <span class="mx-5 mt-2 font-weight-bold">Budget Preferences</span>
                <v-radio-group v-model="comfort_pref" inline>
                  <v-radio label="Luxury" value="luxury"></v-radio>
                  <v-radio label="Mid-range" value="mid-range"></v-radio>
                  <v-radio label="Budget" value="budget"></v-radio>
                </v-radio-group>
                <span v-if="errors && errors.budget_range" class="text-red">{{ errors.budget_range[0] }}</span>
              </v-row>
              <v-row>
                <span class="mx-5 mt-2 font-weight-bold">Transportation Preferences</span>
                <v-radio-group v-model="transportation_pref" inline>
                  <v-radio label="Public Transportation" value="public transportation"></v-radio>
                  <v-radio label="Car" value="car"></v-radio>
                  <v-radio label="Flight" value="flight"></v-radio>
                </v-radio-group>
              </v-row>

              <v-textarea v-model="comment" label="Additional Comments"></v-textarea>
              <div class="d-flex justify-center">
                <v-btn block class="pa-5" color="blue" type="submit" rounded>Submit</v-btn>
              </div>
            </v-form>
          </template>


        </v-stepper>
      </v-col>

    </v-row>

  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
import Banner from '../components/Banner.vue';
export default {
  components: {
    Banner,
  },

  setup() {
    const step = ref(1);
    const items = ref(['Personal Information',
      'Trip Details',
      'Preferences',]);
    const show_toast = ref(false);

    const picker = ref(null);
    const accomodation = ref(['Hotels', 'Boutique Stays']);
    const room = ref(['Single', 'Double', 'Twins']);
    const current_date = ref(new Date().toISOString().split('T')[0]);
    const activities = ref(['Swimming',
      'Diving',
      'Trekking',
      'Vuetify',]);
    const interests = ref(['historical sites',
      'locat markets',
      'festivals']);
    const adventure = ref(['mild',
      'moderate',
      'high']);
    const culinary = ref(['dietary restrictions',
      'local-dishes',
      'western cuisines']);
    const occasion = ref(['birthday',
      'anniversary']);
    const additional = ref(['photographers',
      'guides']);

    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const trip_details = ref('');
    const destination = ref('');
    const traveller_count = ref();
    const travel_date = ref();
    const selected_accomodation = ref('');
    const selected_room = ref('');
    const cultural_interests = ref([]);
    const activity_interests = ref([]);
    const adventure_level = ref('');
    const culinary_request = ref([]);
    const activity_request = ref([]);
    const occasion_pref = ref([]);
    const additional_services = ref([]);
    const selected_budget = ref('');
    const transportation_pref = ref([]);
    const comfort_pref = ref('');
    const comment = ref('');
    const errors = ref({});
    const message = ref('');
    const submitForm = () => {
      if (step.value === 3) {
        axios.post('/api/plans/create', {
          "name": name.value,
          "email": email.value,
          "phone_no": phone.value,
          "trip_details": trip_details.value,
          "destination": destination.value,
          "traveller_count": traveller_count.value,
          "travel_date": travel_date.value,
          "accomodation_pref": selected_accomodation.value,
          "room_pref": selected_room.value,
          "interests": {
            "cultural_interests": cultural_interests.value,
            "sports_interests": activity_interests.value,
            "adventure": adventure_level.value
          },
          "special_requests": {
            "food": culinary_request.value,
            "activity": activity_request.value,
            "occasional": occasion_pref.value,
            "additional": additional_services.value
          },
          "budget_range": "mid",
          "expenses": {
            "transportation": transportation_pref.value,
            "comfort": comfort_pref.value
          },
          "additional_comments": comment.value,
          "subscribe": true,
          "status" : 'new'
        })

          .then(function (response) {
            if (response.status === 200) {
              show_toast.value = true;
              clearValues();
              step.value = 1;
            }
          }
          )
          .catch(error => {
            if (error.response.status === 422) {
              errors.value = error.response.data.errors;
              message.value = "Thers is something wrong in your input.Please check the form again!"
            }
          });
      };
    }
    const clearError = () => {
      message.value = "";
      errors.value = "";
      clearValues;
    }
    const clearValues = () => {
      show_toast.value = false;
      name.value = '';
      phone.value = '';
      email.value = '';
      trip_details.value = '';
      destination.value = '';
      traveller_count.value = '';
      travel_date.value = '';
      selected_accomodation.value = '';
      selected_room.value = '';
      cultural_interests.value = [];
      activity_interests.value = [];
      adventure_level.value = '';
      culinary_request.value = [];
      activity_request.value = [];
      occasion_pref.value = [];
      additional_services.value = '';
      selected_budget.value = '';
      transportation_pref.value = [];
      comfort_pref.value = '';
      comment.value = '';
    }

    return {
      step, items, message, show_toast, errors, picker, accomodation, room, activities, interests, adventure, culinary, occasion, additional,
      name, phone, email, trip_details, destination, traveller_count, travel_date, current_date, selected_accomodation, selected_room,
      cultural_interests, activity_interests, culinary_request, activity_request, selected_budget, transportation_pref, comfort_pref, adventure_level, occasion_pref, additional_services, comment,
      submitForm, clearError, clearValues
    }
  },

}
</script>

<style>

@media (max-width: 600px) {
    .col-sm-12 {
        flex-basis: 100%;
        max-width: 100%;
    }
}

.smaller-date-picker .v-picker__body {
  max-height: 300px;
  /* Set maximum height for the date picker body */
}

.smaller-date-picker .v-picker__body.theme--light {
  background-color: #ffffff;
  /* Ensure background color matches to avoid overflow */
}

.v-text-field label:after {
  content: "*";
  color: red;
  margin-left: 10px;
  /* Adjust spacing as needed */
}

.v-text-field input:required {
  border-color: red;
  /* Optional: Change border color of required input fields */
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.alert-enter-active {
  transition: all 0.3s;
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.alert-leave-active {
  transition: all 0.3s;
}
</style>