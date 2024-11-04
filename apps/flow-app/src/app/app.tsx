import { Route, Routes, Link } from 'react-router-dom';
import { FlowEditor } from '@ai-erp/flow-editor';
import { FlowChat } from '@ai-erp/flow-chat';
import { useCallback, useState } from 'react';

const sop = `graph TD
A[Start] --> B(Receive order)
B --> C{Stock available?}
C -->|Yes| D[Allocate stock]
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
  const [diagram, setDiagram] = useState(sop);
  const [isComplete, setIsComplete] = useState(true);

  const onMessageReceived = useCallback((message: string) => {
    console.log('onMessageReceived/message', message);
    setDiagram(message);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FlowEditor isComplete={isComplete} mermaidCode={diagram} />
      <FlowChat
        onMessageReceived={onMessageReceived}
        className={'absolute bottom-0 left-0 right-0'}
      />
    </div>
  );
}

export default App;
