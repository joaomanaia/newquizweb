import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { MainDrawer } from "@/components/drawer/main-drawer"
import { ModeToggle } from "@/components/mode-toggle"

interface MainAppBarProps {}

export const MainAppBar: React.FC<MainAppBarProps> = () => {
  return (
    <>
      <header className="sticky flex w-full items-center justify-end gap-4 px-4 py-3 md:pr-0">
        <Sheet>
          <SheetTrigger
            render={
              <Button className="text-foreground mr-auto md:hidden" variant="ghost" size="icon">
                <MenuIcon />
              </Button>
            }
          />
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
