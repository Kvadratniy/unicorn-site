<script setup lang="ts">

type FaqItem = {
  question: string
  answer: string
}

type Props = {
  titleId: string
  items: FaqItem[]
  title: string
  subtitle: string
  idPrefix: string
}

const {
  titleId,
  items,
  title,
  subtitle,
  idPrefix,
} = defineProps<Props>()

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const panelId = (index: number) => `${idPrefix}-panel-${index}`
const triggerId = (index: number) => `${idPrefix}-trigger-${index}`
</script>

<template>
  <div>
    <UTitle
      :title-id="titleId"
      :title="title"
      :subtitle="subtitle"
    />

    <div class="faq-list" role="list">
      <UFaqItem
        v-for="(item, index) in items"
        :key="`${item.question}-${index}`"
        :item="item"
        :index="index"
        :is-open="openIndex === index"
        :panel-id="panelId(index)"
        :trigger-id="triggerId(index)"
        @toggle="toggle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
</style>
