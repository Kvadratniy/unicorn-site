<script setup lang="ts">
type Props = {
  center: [number, number]
  zoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 15,
})

const config = useRuntimeConfig()

const mapContainer = ref<HTMLElement | null>(null)
const mapInstance = ref<any>(null)
const markerInstance = ref<any>(null)
const isScriptLoaded = ref(false)

// Declare Yandex Maps types
declare global {
  interface Window {
    ymaps: any
  }
}

const loadYandexMaps = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.ymaps) {
      resolve()
      return
    }

    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve())
      return
    }

    const script = document.createElement('script')
    const apiKey = config.public.yandexMapsApiKey as string | undefined

    script.src = apiKey
      ? `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
      : 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Yandex Maps'))
    document.head.appendChild(script)
  })
}

const initMap = () => {
  if (!window.ymaps || !mapContainer.value) return

  window.ymaps.ready(() => {
    if (mapContainer.value) {
      mapInstance.value = new window.ymaps.Map(mapContainer.value, {
        center: props.center,
        zoom: props.zoom,
        controls: ['zoomControl'],
      })

      markerInstance.value = new window.ymaps.Placemark(
        props.center,
        {},
        {
          preset: 'islands#blackIcon',
        }
      )

      mapInstance.value.geoObjects.add(markerInstance.value)
    }
  })
}

onMounted(async () => {
  if (typeof window !== 'undefined' && mapContainer.value) {
    try {
      await loadYandexMaps()
      isScriptLoaded.value = true
      initMap()
    } catch (error) {
      console.error('Error loading Yandex Maps:', error)
    }
  }
})

onBeforeUnmount(() => {
  if (!mapInstance.value) return

  try {
    // Корректно убираем метку и слои, затем уничтожаем карту
    if (markerInstance.value && mapInstance.value.geoObjects?.remove) {
      mapInstance.value.geoObjects.remove(markerInstance.value)
    }

    if (typeof mapInstance.value.destroy === 'function') {
      mapInstance.value.destroy()
    }
  } catch (error) {
    // Яндекс-карта иногда кидает внутренние ошибки при повторном destroy — гасим их
    console.warn('YandexMap destroy error (ignored):', error)
  } finally {
    mapInstance.value = null
    markerInstance.value = null
  }
})
</script>

<template>
  <div ref="mapContainer" class="yandex-map" />
</template>

<style scoped>
.yandex-map {
  width: 100%;
  height: 520px;
  max-height: 70vh;
  border-radius: 24px;
  overflow: hidden;
  background-color: #f5f5f5;
}

@media (max-width: 1024px) {
  .yandex-map {
    height: 420px;
    border-radius: 20px;
  }
}

@media (max-width: 768px) {
  .yandex-map {
    height: 360px;
    border-radius: 16px;
  }
}

@media (max-width: 480px) {
  .yandex-map {
    height: 300px;
    border-radius: 14px;
  }
}
</style>
