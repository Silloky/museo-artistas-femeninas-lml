<script setup lang="ts">
import router from '@/router';
import useArtStore from '@/stores/artStore';
import Loader from '@/components/Loader.vue';
import BottomMention from '@/components/BottomMention.vue';
import MarkdownRenderer from '@/components/MarkdownRender.vue';
import { onMounted, ref } from 'vue';
import type ArtPiece from '@/types/art';
import { isMobile } from 'mobile-device-detect';

import { Presentation, UserPen, Calendar, MapPinned, Brush, GraduationCap, Ruler, Wrench } from 'lucide-vue-next';

const artID = router.currentRoute.value.params.id as string;
var artPiece = ref(undefined as ArtPiece | undefined)

onMounted(async () => {
  artPiece.value = await useArtStore().fetchArtPieces().then((artStore) => {
    const piece = artStore!.getArtPieceById(artID);
    console.log(piece);
    return piece
  });
});

function dimensionsTransform(dimensions: string) {
  var betterDimensions = dimensions.replace(/(\d*) (\d*)/gm, '$1 × $2 cm');
  console.log(betterDimensions);
  return betterDimensions
}

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
    <div class="detailsSeparator"></div>
    <div id="artText">
      <h2>Presentación escrita</h2>
      <MarkdownRenderer :source="artPiece?.texto" :demote="2" />
    </div>
    <div class="detailsSeparator verticalSeparator"></div>
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
          <Brush />
          <span class="pieceOfInfoTitle">Movimiento</span>
          <span class="pieceOfInfoData">{{ artPiece.movimiento }}</span>
        </div>
        <div class="artInfoSection">
          <Wrench />
          <span class="pieceOfInfoTitle">Técnica</span>
          <span class="pieceOfInfoData">{{ artPiece.tecnica }}</span>
        </div>
        <div class="artInfoSection">
          <Ruler />
          <span class="pieceOfInfoTitle">Dimensiones</span>
          <span class="pieceOfInfoData">{{ dimensionsTransform(artPiece.dimensiones) }}</span>
        </div>
        <div class="artInfoSection">
          <MapPinned />
          <span class="pieceOfInfoTitle">Lugar de exposición</span>
          <span class="pieceOfInfoData">{{ artPiece.lugar_exposicion }}</span>
        </div>
        <div class="artInfoSection">
          <GraduationCap />
          <span class="pieceOfInfoTitle">Estudiante</span>
          <span class="pieceOfInfoData">{{ artPiece.estudiante }}</span>
        </div>
        <div class="artInfoSection">
        </div>
      </div>
    </div>
    <div class="detailsSeparator"></div>
    <div id="audioWrapper">
      <h2>Presentación oral</h2>
      <iframe id="artAudio" :src="artPiece.lace_grabacion"></iframe>
    </div>
  </div>
  <div id="loader-wrapper" v-if="!artPiece">
    <Loader />
  </div>
  <BottomMention />
</template>

<style scoped>
#details-wrapper {
  display: grid;

  grid-template-rows: repeat(5, auto);
  grid-template-columns: minmax(0, 2fr) 2px minmax(0, 1fr);
  justify-content: center;

  width: 80%;
  padding: 5vh;
  box-sizing: border-box;
  gap: 5vh;
  overflow: hidden;
  padding-bottom: 10vh;
}

#artHeadline {
  text-align: center;
  grid-column: span 3;
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
  grid-column: span 3;
  place-self: center;
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

.detailsSeparator {
  place-self: center;
  width: 140%;
  height: 2px;
  background-color: rgb(104, 104, 104);
  grid-column: span 3;
}

.verticalSeparator {
  width: 2px;
  height: 100%;
  grid-column: unset;
}

#artText {
  max-width: 70ch;
  box-sizing: content-box;
}

#artText h2, #artInfo h2, #audioWrapper h2 {
  margin-top: 0;
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

#audioWrapper {
  place-self: center;
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  width: 150%;
}

#audioWrapper h2 {
  text-align: center;
}

#audioWrapper iframe {
  border: none;
  height: 100px;
}

@media screen and (max-width: 970px) {
  #details-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, auto);
  }

  #artInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #artInfo h2 {
    align-self: baseline;
  }

  #artInfoGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-right: 40px;
  }

  #artHeadline, #imageWrapper, .detailsSeparator, #artText, #artInfo, #audioWrapper {
    grid-column: unset;
  }

  .verticalSeparator {
    width: 140%;
    height: 2px;
  }

}

@media screen and (max-width: 600px) {
  #details-wrapper {
    width: 90%;
    padding: 2vh;
  }

  #artInfoGrid {
    grid-template-columns: 1fr;
    margin-right: 0;
  }

  h2 {
    text-align: center;
  }
  
}

#loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 8vh);
  height: calc(100svh - 8svh);
}
</style>
