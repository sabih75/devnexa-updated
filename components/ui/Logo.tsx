'use client';
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function LogoMark({ size = 32, className = '' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="DevNexa Logo"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain',
      }}
    />
  );
}
