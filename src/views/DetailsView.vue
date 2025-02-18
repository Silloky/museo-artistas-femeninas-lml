<script setup lang="ts">
import router from '@/router';
import useArtStore from '@/stores/artStore';
import Loader from '@/components/Loader.vue';
import MarkdownRenderer from '@/components/MarkdownRender.vue';
import { onMounted, ref } from 'vue';
import type ArtPiece from '@/types/art';
import { isMobile } from 'mobile-device-detect';

import { Presentation, UserPen, Calendar, Earth, Brush, GraduationCap } from 'lucide-vue-next';

const artID = router.currentRoute.value.params.id as string;
var artPiece = ref(undefined as ArtPiece | undefined)

onMounted(async () => {
  artPiece.value = await useArtStore().fetchArtPieces().then((artStore) => {
    const piece = artStore!.getArtPieceById(artID);
    console.log(piece);
    return piece
  });
});

</script>

<template>
  <div id="details-wrapper" v-if="artPiece">
    <div id="artHeadline">
      <h1>{{ artPiece?.nombre_cuadro }}</h1>
      <h2>{{ artPiece?.nombre_artista }}</h2>
    </div>
    <div id="imageWrapper" :class="{ 'mobile': isMobile }">
      <img :src="artPiece?.lace_imagen" :alt="artPiece?.nombre_cuadro" v-if="!isMobile" />
      <a :href="artPiece?.lace_imagen" v-else>
        <img :src="artPiece?.lace_imagen" :alt="artPiece?.nombre_cuadro" />
      </a>
    </div>
    <div id="artPresentation">
      <div id="artText">
        <h2>Texto de presentación</h2>
        <MarkdownRenderer :source="artPiece?.texto" :demote="2" />
      </div>
      <div id="verticalRule"></div>
      <div id="artInfo">
        <h2>Informaciones sobre la obra</h2>
        <div id="artInfoGrid">
            <div class="artInfoSection">
              <Presentation />
              <span class="pieceOfInfoTitle">Nombre</span>
              <span class="pieceOfInfoData">{{ artPiece.nombre_cuadro }}</span>
            </div>
            <div class="artInfoSection">
              <UserPen />
              <span class="pieceOfInfoTitle">Artista</span>
              <span class="pieceOfInfoData">{{ artPiece.nombre_artista }}</span>
            </div>
            <div class="artInfoSection">
              <Calendar />
              <span class="pieceOfInfoTitle">Año de creación</span>
              <span class="pieceOfInfoData">{{ artPiece.ano_creacion }}</span>
            </div>
            <div class="artInfoSection">
              <Earth />
              <span class="pieceOfInfoTitle">País de creación</span>
              <span class="pieceOfInfoData">{{ artPiece.pais_creacion }}</span>
            </div>
            <div class="artInfoSection">
              <Brush />
              <span class="pieceOfInfoTitle">Movimiento</span>
              <span class="pieceOfInfoData">{{ artPiece.movimiento }}</span>
            </div>
          <div class="artInfoSection">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="loader-wrapper" v-if="!artPiece">
    <Loader />
  </div>
</template>

<style scoped>
#details-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5vh;
  box-sizing: border-box;
  gap: 5vh;
}

#artHeadline {
  text-align: center;
}

#artHeadline h1 {
  margin: 0;
  margin-bottom: 10px;
  text-decoration: underline;
}

#artHeadline h2 {
  margin: 0;
}

#imageWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  width: 80vw;
}

#imageWrapper.mobile {
  height: unset;
  width: unset;
}

#imageWrapper a {
  width: 100%;
  height: 100%;
}

#imageWrapper a img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#details-wrapper img {
  border-radius: 15px;
  width: auto;
  height: 100%;
}

#artPresentation {
  width: 80%;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 2fr) 2px 1fr;
  gap: 4%;
}

#artText {
  max-width: 70ch;
  box-sizing: content-box;
}

#artText h2, #artInfo h2 {
  margin-top: 0;
}

#verticalRule {
  width: 2px;
  background-color: rgb(104, 104, 104);
  /* margin: 20px 0; */
}

#artInfoGrid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 40px;
}

.artInfoSection {
  display: grid;
  grid-template-columns: 1fr 7fr;
  align-items: center;
  column-gap: 20px;
}

.artInfoSection svg {
  grid-row: span 2;
}

.pieceOfInfoTitle {
  text-decoration: underline;
}

@media screen and (max-width: 970px) {
  #artPresentation {
    grid-template-columns: 1fr;
    grid-template-rows: auto 2px auto;
  }

  #verticalRule {
    width: 100%;
    height: 2px;
  }

  #artInfoGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-right: 40px;
  }

}



#loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: 100svh;
}
</style>
