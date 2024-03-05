<template>
    <v-parallax :aspect-ratio="1" :src="src" max-height="300px" class="fill-height img">
        <v-row align="end" class="fill-height align-content-center">
            <v-col cols="12">
                <v-container class="text-center">
                    <h1 class="text-black headline text-uppercase">{{ text }}</h1>
                </v-container>
            </v-col>
        </v-row>

    </v-parallax>
</template>

<script>
export default {
    props: ['src', 'text']
}
</script>

<style scoped>
.img {
  position: relative;
}

.img::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(238, 224, 224, 0.3); /* Adjust opacity as needed */
}
</style>