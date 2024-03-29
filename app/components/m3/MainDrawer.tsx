import {
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
import {
  HomeRounded,
  ListRounded,
  SettingsRounded,
} from "@mui/icons-material"
import NextLink from "next/link"
import { twMerge } from "tailwind-merge"
import { UrlObject } from "url"

export interface MainDrawerProps extends DrawerProps {}

interface NavDrawerItem {
  title: string
  icon: any
  pathName: __next_route_internal_types__.RouteImpl<String> | UrlObject
  requireAuth?: boolean
  disabled?: boolean
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
      {
        title: "Multi Choice Quiz",
        icon: <ListRounded />,
        pathName: "/list/multichoicequiz",
      },
    ],
  },
  {
    id: "Other",
    children: [
      {
        title: "Settings",
        icon: <SettingsRounded />,
        pathName: "/settings",
      }
    ]
  }
]

const MainDrawer: React.FC<MainDrawerProps> = (props) => {
  const { ...others } = props

  const routerPath = usePathname()

  return (
    <Drawer variant="permanent" {...others}>
      <Toolbar>
        <Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}>
          Fega
        </Typography>
      </Toolbar>
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
                className={twMerge("text-inherit bg-inherit decoration-transparent", navDrawerItem.disabled && "cursor-default")}
                href={navDrawerItem.pathName}
                key={navDrawerItem.title}
                passHref
              >
                <ListItem>
                  <ListItemButton
                    disabled={navDrawerItem.disabled}
                    selected={routerPath == navDrawerItem.pathName}>
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

export default MainDrawer
