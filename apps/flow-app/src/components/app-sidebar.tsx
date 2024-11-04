import {
  Sidebar, SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@ai-erp/shared-ui';
import { Plus } from 'lucide-react';

export function AppSidebar() {
  const chartChats = [
    {
      name: 'Flowchart Assistant',
      url: 'https://flowchart-assistant.vercel.app/',
      icon: <span className="text-xl">🤖</span>
    }
  ];
  return (
    <>
      <Sidebar side="left" collapsible="offcanvas" variant="sidebar">
        <SidebarHeader className="flex flex-row h-16 shrink-0 items-center gap-4 px-4">
          <h1 className="text-md font-bold text-foreground">My Flowcharts</h1>
        </SidebarHeader>
        <SidebarContent className={'px-4'}>
          User accounts and chart history saving are currently under development
          {/*  <SidebarGroup>*/}
          {/*    <SidebarGroupLabel asChild>Projects</SidebarGroupLabel>*/}
          {/*    <SidebarGroupAction title="Add Project">*/}
          {/*      <Plus /> <span className="sr-only">Add Project</span>*/}
          {/*    </SidebarGroupAction>*/}
          {/*    <SidebarGroupContent>*/}
          {/*      <SidebarMenu>*/}
          {/*        {chartChats.map((item) => (*/}
          {/*          <SidebarMenuItem key={item.name}>*/}
          {/*            <SidebarMenuButton asChild>*/}
          {/*              <a href={item.url}>*/}
          {/*                /!*<ProjectIcon />*!/*/}
          {/*                <span>{item.name}</span>*/}
          {/*              </a>*/}
          {/*            </SidebarMenuButton>*/}
          {/*          </SidebarMenuItem>*/}
          {/*        ))}*/}
          {/*      </SidebarMenu>*/}
          {/*    </SidebarGroupContent>*/}
          {/*  </SidebarGroup>*/}
        </SidebarContent>
        <SidebarFooter className={'px-4'}>
        </SidebarFooter>
      </Sidebar>

    </>
  );
}

export default AppSidebar;
