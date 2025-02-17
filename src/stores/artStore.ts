import { defineStore } from "pinia";
import Papa from 'papaparse';
import type ArtPiece from "@/types/art";

const useArtStore = defineStore('art', {
    state: () => ({
        artPieces: [] as ArtPiece[],
    }),
    actions: {
        async fetchArtPieces() {
            try {
                const results = await new Promise<Papa.ParseResult<ArtPiece>>((resolve, reject) => {
                    Papa.parse<ArtPiece>(`${import.meta.env.VITE_SRC_SPREADSHEET}&cache=${new Date().getTime()}`, {
                        download: true,
                        header: true,
                        complete: (results) => resolve(results),
                        error: (error) => reject(error),
                    });
                });

                this.artPieces = results.data.filter((artPiece) => artPiece.lace_imagen !== '' && artPiece.id !== '');
                return this;
            } catch (error) {
                console.error('error', error);
            }
        },
    },
    getters: {
        getAllArtPieces(state): ArtPiece[] {
            return state.artPieces;
        },
        getArtPieceById: (state): (id: string) => ArtPiece | undefined => {
            return (id: string) => state.artPieces.find(artPiece => artPiece.id === id);
        }
    },
    persist: {
        storage: sessionStorage
    }
});

export default useArtStore;