/** Типы для Network Information API (не во всех версиях lib.dom) */
type NetworkConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'none'
  | 'wifi'
  | 'wimax'
  | 'other'
  | 'unknown'

type NetworkInformationLike = {
  type?: NetworkConnectionType
  saveData?: boolean
  addEventListener?: (type: string, listener: () => void) => void
  removeEventListener?: (type: string, listener: () => void) => void
}

/**
 * Определяет предпочтение по типу контента (видео vs картинка) на основе сети.
 * Использует Network Information API (Chrome, Edge; не поддерживается в Safari/Firefox).
 *
 * - cellular / saveData → предпочитаем картинку (экономия трафика)
 * - wifi / ethernet → можно показывать видео
 * - API недоступен → null (используйте fallback по viewport)
 */
export const useConnectionType = () => {
  const preferImage = ref<boolean | null>(null)

  const updatePreference = () => {
    if (import.meta.server || typeof navigator === 'undefined') return

    const conn = (navigator as Navigator & { connection?: NetworkInformationLike })
      .connection

    if (!conn) {
      preferImage.value = null
      return
    }

    // Режим «экономный трафик» в браузере/ОС
    if (conn.saveData) {
      preferImage.value = true
      return
    }

    switch (conn.type) {
      case 'cellular':
        preferImage.value = true
        break
      case 'wifi':
      case 'ethernet':
        preferImage.value = false
        break
      default:
        preferImage.value = null
    }
  }

  let connection: NetworkInformationLike | undefined

  onMounted(() => {
    updatePreference()
    connection = (navigator as Navigator & { connection?: NetworkInformationLike })
      .connection
    connection?.addEventListener?.('change', updatePreference)
  })

  onUnmounted(() => {
    connection?.removeEventListener?.('change', updatePreference)
  })

  return { preferImage }
}
