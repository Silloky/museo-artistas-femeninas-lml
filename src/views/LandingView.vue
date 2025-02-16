<script setup lang="ts">
import Papa from 'papaparse';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import Loader from '@/components/Loader.vue';

type TableData = {
  id: string;
  nombre_cuadro: string;
  nombre_artista: string;
  ano_creacion: number;
  pais_creacion: string;
  lace_imagen: string;
  texto: string;
  lace_grabacion: string;
}[];

const tableData = ref<TableData>([]);

const galleryLoaded = ref(false)

Papa.parse(import.meta.env.VITE_SRC_SPREADSHEET, {
  download: true,
  header: true,
  complete: (results) => {
    setTimeout(() => {
      tableData.value = (results.data as TableData).filter((item) => item.id !== "" && item.lace_imagen !== "");
      galleryLoaded.value = true;
      console.log(tableData.value);
    }, 2500);
  },
  error: (error) => {
    console.error('error', error);
  },
});

</script>

<template>
  <div id="landing-wrapper" :class="{ 'restrictHeight': !galleryLoaded }">
    <div id="title-section">
      <h1>El Museo Virtual de Artistas Feministas Hispanas</h1>
      <h2>La Merci Littoral</h2>
    </div>
    <div id="gallery" :class="{ 'hidden': !galleryLoaded }">
      <RouterLink :to="{name: 'details', params: {id: item.id}}" v-for="(item, index) in tableData">
        <img :src="item.lace_imagen" :alt="item.nombre_cuadro" />
      </RouterLink>
    </div>
    <div id="loader-wrapper" v-if="!galleryLoaded">
      <Loader />
    </div>
    <div id="cp-mention">Hecho con ❤️ por Elias Kirkwood para su clase de español</div>
  </div>
</template>

<style scoped>

#landing-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5vh;
  box-sizing: border-box;
  gap: 5vh;
}

#landing-wrapper.restrictHeight {
  height: 100vh;
}

#title-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0;
}

h2 {
  font-size: 2rem;
  background: rgb(128, 198, 214);
  background: linear-gradient(95deg, rgba(128, 198, 214, 1) 0%, rgba(16, 152, 218, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#gallery.hidden {
  opacity: 0;
}

#gallery {
  width: 100%;
  height: fit-content;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

#gallery {
  gap: 30px;
  columns: 3;
}

@media screen and (max-width: 630px) {
  #gallery {
    columns: 2;
  }
}

@media screen and (max-width: 430px) {
  #gallery {
    columns: 1;
  }
}

#gallery a {
  padding-bottom: 30px;
  display: block;
  height: fit-content;
}

#gallery img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 7px;
}


#loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
}

#cp-mention {
  font-size: 1rem;
  color: #8e8e8e;
  text-align: center;
}

</style>
