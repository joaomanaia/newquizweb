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
import { FC } from "react"
import { useRouter } from "next/router"
import { HomeRounded, PasswordRounded, FormatListBulletedRounded } from "@mui/icons-material"

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
        pathName: "/",
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
        pathName: "/multichoicequiz",
      },
      /*
      {
        title: "Wordle",
        icon: <PasswordRounded />,
        pathName: "/wordle",
      }
      */
    ]
  }
]

const NavDrawer: FC<NavDrawerProps> = (props) => {
  const { ...others } = props

  const router = useRouter()

  const routerAsPath = router.asPath
  const routerPathSubString = routerAsPath.substring(0, routerAsPath.lastIndexOf("?"))
  const routerPath = routerPathSubString == "" ? routerAsPath : routerPathSubString

  const handleListItemClick = (navDrawerItem: NavDrawerItem) => {    
    router.push(navDrawerItem.pathName)
  }
  
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
              <ListItem key={navDrawerItem.title}>
                <ListItemButton
                  selected={routerPath == navDrawerItem.pathName}
                  onClick={() => handleListItemClick(navDrawerItem)}
                >
                  <ListItemIcon>{navDrawerItem.icon}</ListItemIcon>
                  <ListItemText>{navDrawerItem.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

export default NavDrawer
