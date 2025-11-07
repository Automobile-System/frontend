"use client"

import { User } from "@/hooks/useAuth"
import { UserMenu } from "./UserMenu"
import { Button } from "../ui/button"
import Link from "next/link"

interface AuthButtonsProps {
  user: User | null
}

export function AuthButtons({ user }: AuthButtonsProps) {
  if (user) {
    return <UserMenu initialUser={user} />
  }

  return (
    <Link href="/booking">
      <Button 
        className="btn-accent text-black font-teko uppercase tracking-[0.15em] rounded-md px-5 py-3 text-[16px] shadow-accent-glow transition-all"
        size="lg"
      >
        BOOK NOW
      </Button>
    </Link>
  )
}
