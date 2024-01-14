import { RefObject, useCallback, useEffect } from 'react'

export interface UseOutSideClickProps<T extends Node> {
  BaseEl: RefObject<T>
  handleOnClickOutSide: () => void
}

function useOutSideClick<T extends Node>({
  BaseEl,
  handleOnClickOutSide,
}: UseOutSideClickProps<T>) {
  const clickHandler = useCallback(e => {
    const CurrentTargetEL = e.target as HTMLElement
    if (BaseEl.current && !BaseEl.current.contains(CurrentTargetEL)) {
      handleOnClickOutSide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.addEventListener('click', clickHandler, { capture: true })
    return () => {
      document.removeEventListener('click', clickHandler, { capture: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useOutSideClick
