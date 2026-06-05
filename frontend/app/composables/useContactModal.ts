/**
 * Глобальное состояние модального окна «Свяжитесь с нами».
 * Используйте open() / close() из любого компонента.
 */
export const useContactModal = () => {
  const isOpen = useState<boolean>('contact-modal-open', () => false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return { isOpen, open, close }
}
