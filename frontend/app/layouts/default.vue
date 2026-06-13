<script setup lang="ts">

const { isOpen: isContactModalOpen, close: closeContactModal } = useContactModal()
</script>

<template>
  <div class="min-h-screen flex flex-col main-gradient">
    <UHeadline />

    <UBaseWrapper>
      <slot />
    </UBaseWrapper>

    <UGift />
    <UFooter />

    <UContactModal :is-open="isContactModalOpen" @close="closeContactModal" />
  </div>
</template>

<style scoped>
.main-gradient {
  background: #fdfcf8;
}
</style>
