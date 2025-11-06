import { useState } from "react"
import { AIChatButton } from "./AIChatButton"
import { AIChatWindow } from "./AIChatWindow"

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseChat = () => {
    setIsOpen(false)
  }

  return (
    <>
      <AIChatButton onClick={handleToggleChat} />
      <AIChatWindow isOpen={isOpen} onClose={handleCloseChat} />
    </>
  )
}