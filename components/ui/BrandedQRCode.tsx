'use client'

import { QRCode } from 'react-qrcode-logo'

interface BrandedQRCodeProps {
  value: string
  size?: number
  id?: string
  variant?: 'dark' | 'light'
  className?: string
}

export default function BrandedQRCode({ value, size = 160, id, variant = 'dark', className }: BrandedQRCodeProps) {
  const isDark = variant === 'dark'

  return (
    <div className={`${isDark ? 'bg-black' : 'bg-white'} p-4 rounded-xl shadow-inner inline-block ${className ?? ''}`}>
      <QRCode
        id={id}
        value={value}
        size={size}
        bgColor={isDark ? '#000000' : '#ffffff'}
        fgColor={isDark ? '#ffffff' : '#000000'}
        ecLevel="H"
        logoImage={isDark ? '/app-icon-black-square.png' : '/app-icon-white.svg'}
        logoWidth={size * 0.25}
        logoHeight={size * 0.25}
        logoPadding={3}
        logoPaddingStyle="square"
        quietZone={0}
        qrStyle="dots"
        eyeRadius={3}
      />
    </div>
  )
}
