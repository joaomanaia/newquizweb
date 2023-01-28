import {
  AppBar,
  Box,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import { usePathname } from "next/navigation"
import NextLink from "next/link"
import { HomeRounded, FormatListBulletedRounded } from "@mui/icons-material"

export interface NavDrawerProps extends DrawerProps {}

interface NavDrawerItem {
  title: string
  icon: any
  pathName: string
  requireAuth?: boolean
}

interface NavDrawerItemGroup {
  id: string
  hideTitle?: boolean
  children: NavDrawerItem[]
}

const categories: NavDrawerItemGroup[] = [
  {
    id: "Home",
    hideTitle: true,
    children: [
      {
        title: "Home",
        icon: <HomeRounded />,
        pathName: "/list",
      },
    ],
  },
  {
    id: "Quiz",
    hideTitle: false,
    children: [
      {
        title: "Multi choice quiz",
        icon: <FormatListBulletedRounded />,
        pathName: "/list/multichoicequiz",
      },
      /*
        {
          title: "Wordle",
          icon: <PasswordRounded />,
          pathName: "/wordle",
        }
        */
    ],
  },
]

const NavDrawer: React.FC<NavDrawerProps> = (props) => {
  const { ...others } = props

  const routerPath = usePathname()

  return (
    <Drawer variant="permanent" {...others}>
      <AppBar color="default" elevation={0} position="sticky">
        <Toolbar></Toolbar>
      </AppBar>
      <List>
        {categories.map(({ id, children, hideTitle }) => (
          <Box key={id}>
            {!hideTitle && (
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ fontWeight: "bold" }}>
                  <Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }}>
                    {id}
                  </Typography>
                </ListItemText>
              </ListItem>
            )}
            {children.map((navDrawerItem) => (
              <NextLink 
                className="text-inherit bg-inherit decoration-transparent"
                href={navDrawerItem.pathName}
                key={navDrawerItem.title}
                passHref>
                <ListItem>
                  <ListItemButton selected={routerPath == navDrawerItem.pathName}>
                    <ListItemIcon>{navDrawerItem.icon}</ListItemIcon>
                    <ListItemText>{navDrawerItem.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </NextLink>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

export default NavDrawer
