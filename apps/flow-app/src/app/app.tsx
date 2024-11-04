import { Route, Routes, Link } from 'react-router-dom';
import { FlowEditor } from '@ai-erp/flow-editor';
import { FlowChat } from '@ai-erp/flow-chat';
import { useCallback, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider, SidebarTrigger
} from '@ai-erp/shared-ui';
import Introduction from '../components/introduction';

const sop = `graph TD
A[Start] --> B(Receive order)
B --> C{Stock available?}
C -->|YesOtherEdge| D[Allocate stock]
C -->|No| E[Order from supplier]
D --> F[Pack items]
F --> G[Label items]
G --> H[Quality check]
H --> I[Prepare for shipping]
I --> J[Dispatch order]
J --> K[Update inventory]
K --> L{More orders?}
L -->|Yes| B
L -->|No| M[End]
E --> N{Items received?}
N -->|Yes| D
N -->|No| O[Follow up with supplier]
O --> B
`;

const AppHeader = () => {
  return <header className="flex h-16 shrink-0 items-center gap-2">
    <div className="flex items-center gap-2 px-4 justify-between w-full">
      <div>
        <SidebarTrigger className="-ml-1" />
      </div>
      <div>
        <h1 className="text-md font-bold text-foreground">Flowchart Assistant</h1>
      </div>
      <div>
        <Introduction />
      </div>
    </div>
  </header>;
};

export function App() {
  const [diagram, setDiagram] = useState(sop);
  const [isComplete, setIsComplete] = useState(true);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  const onMessageReceived = useCallback((message: string) => {
    console.log('onMessageReceived/message', message);
    setDiagram(message);
  }, []);

  return (<>
      <SidebarProvider>
        <Sidebar side="left" collapsible="offcanvas" variant="sidebar">
          <SidebarHeader className="flex flex-row h-16 shrink-0 items-center gap-4 px-4">
            <h1 className="text-md font-bold text-foreground">Flowcharts</h1>
          </SidebarHeader>
          <SidebarContent className={'px-4'}>
            Login to save and revisit previous chart chats!
          </SidebarContent>
          <SidebarFooter className={'px-4'}>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <ResizablePanelGroup direction={orientation}
                                 className={'min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-hidden border-1 border-primary/20'}>
              <ResizablePanel>
                <FlowEditor isComplete={isComplete} mermaidCode={diagram} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <FlowChat
                  onMessageReceived={onMessageReceived}
                  // className={'absolute bottom-0 left-0 right-0'}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
