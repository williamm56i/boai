<template>
    <div class="act-detail">
        <Panel>
            {{ id }}
        </Panel>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const router = useRoute();
const id = router.params.id;
</script>
<style scoped>
.act-detail {
    display: flex;
    justify-content: center;
}
.p-panel {
    width: 40%;
}
</style>