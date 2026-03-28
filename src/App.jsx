import React from 'react'
import SlideEngine from './components/SlideEngine/SlideEngine'
import { slides } from './slides'

export default function App() {
  return <SlideEngine slides={slides} />
}
