import React from 'react'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}

export default AppLayout