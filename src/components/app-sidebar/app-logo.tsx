import Image from "next/image"

export function AppLogo({ className }: { className?: string }) {
  return <Image src="/icons/logo-114.png" alt="Logo" width={35} height={35} className={className} />
}
