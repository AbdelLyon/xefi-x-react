export type LayoutProps = {
  children: React.ReactNode
  navbar?: NavbarProps
  sidebar?: SidebarProps
  className?: string
}

import type { NavbarProps } from "@/navbar/Navbar"
import { Navbar } from "@/navbar/Navbar"
import type { SidebarProps } from "@/sidebar/Sidebar"
import { Sidebar } from "@/sidebar/Sidebar"

import { mergeTailwindClasses } from "@/utils"
import type { JSX } from "react"

export const Layout = ({
  children,
  navbar,
  sidebar,
  className,
}: LayoutProps): JSX.Element => {
  const hasNavbar = Boolean(navbar)
  const hasSidebar = Boolean(sidebar)

  return (
    <div className="relative h-full max-h-screen overflow-x-hidden bg-background">
      {/* Navbar */}
      {hasNavbar && <Navbar {...navbar} />}

      {hasSidebar && <Sidebar {...sidebar} />}

      <main
        className={mergeTailwindClasses(
          "transition-all duration-300 h-full overflow-y-auto",
          {
            "pt-16": hasNavbar, // Espace pour la navbar fixe
          },
          className
        )}
        style={{
          marginLeft: hasSidebar ? "var(--sidebar-width, 270px)" : "0px",
        }}
      >
        <div className="container mx-auto max-w-none p-6">{children}</div>
      </main>
    </div>
  )
}
