<template>
    <div v-html="markdown.render(demoteMdHeaders(props.source, props.demote))"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
const markdown = new MarkdownIt()

function demoteMdHeaders(md: string, demote: number): string {
    if (demote <= 0) return md;
    return demoteMdHeaders(md.replace(/^(#+)/gm, '$1#'), demote - 1);
}

const props = defineProps({
    source: {
        type: String,
        required: true
    },
    demote: {
        type: Number,
        default: 0
    }
})

</script>