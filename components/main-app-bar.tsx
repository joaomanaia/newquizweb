import { MainDrawer } from "@/components/drawer/main-drawer"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

interface MainAppBarProps {}

export const MainAppBar: React.FC<MainAppBarProps> = () => {
  return (
    <>
      <header className="sticky py-3 px-4 md:pr-0 flex w-full items-center justify-end gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="md:hidden mr-auto text-foreground"
              color="inherit"
              variant="ghost"
              size="icon"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <MainDrawer usingSheet />
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <ModeToggle />
      </header>
    </>
  )
}
