import { FlowEditor } from '@ai-erp/flow-editor';
import { ChatContextProvider, FlowChat } from '@ai-erp/flow-chat';
import { useCallback, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  SidebarInset,
  SidebarProvider,
} from '@ai-erp/shared-ui';
import AppSidebar from '../components/app-sidebar';
import AppHeader from '../components/app-header';

const initialExample = `graph TD
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

export function App() {
  const [diagram, setDiagram] = useState(initialExample);
  const [isComplete, setIsComplete] = useState(true);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  );

  const onMessageReceived = useCallback((message: string) => {
    setDiagram(message);
  }, []);

  return (
    <SidebarProvider>
      {/*<ChatContextProvider>*/}
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <ResizablePanelGroup
              direction={orientation}
              className={'min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-hidden border-1 border-primary/20'}
            >
              <ResizablePanel>
                <FlowEditor isComplete={isComplete} mermaidCode={diagram} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={33}>
                <FlowChat onMessageReceived={onMessageReceived} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SidebarInset>
      {/*</ChatContextProvider>*/}
      </SidebarProvider>
  );
}

export default App;
