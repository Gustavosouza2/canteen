'use client'

import { useState, useEffect } from 'react'

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    }

    checkMobile()

    const mediaQuery = window.matchMedia('(max-width: 767px)')

    mediaQuery.addEventListener('change', checkMobile)

    return () => mediaQuery.removeEventListener('change', checkMobile)
  }, [])

  return isMobile
}
