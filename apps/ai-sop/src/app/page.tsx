'use client';

import { useCallback, useState } from 'react';
import { FlowChat } from '@ai-erp/flow-chat';
import { FlowEditor, Diagram } from '@ai-erp/flow-editor';
// import { Chat } from '../components/chat';
// import Diagram from '../components/diagram';


// export const mermaidCode1 = `graph LR
// start[Start] --> type_username[Type Username]
// type_username --> type_password[Type Password]
// type_password --> click_button[Click on Button]
// click_button -->|Success| check_title[Check Home Page Title]
// click_button -->|Error| check_alert[Check Alert Message]
// check_title --> finish[Finish]
// check_alert --> finish`;
//
//
// export const sampleMermaidCode2 = `graph TD
// Start["Start ¡!startEvent!¡"]
// Username["Type username ¡!activity!¡"]
// Password["Type password ¡!activity!¡"]
// Button["Click on the button ¡!activity!¡"]
// Success["Check home page title ¡!activity!¡"]
// Error["Check alert message ¡!activity!¡"]
// Finish["Finish ¡!endEvent!¡"]
//
// Start --> Username
// Username --> Password
// Password --> Button
// Button --> Success
// Button --> Error
// Success --> Finish
// Error --> Finish`;

const simpleTD = `graph TD
    A(Start) --> B(Activity)
    B --> C(Activity)
    C --> D(Activity)
    D --> E(Activity)
    E --> F(Activity)
    F --> G(End)
`

const mcdonalds = `graph TD
A(Start) --> B(Identify potential leads)
B --> C(Contact leads to qualify)
C --> D(Schedule product demo)
D --> E(Conduct product demo)
E --> F(Follow up with pricing details)
F --> G(Negotiate terms)
G --> H(Close the sale)
H --> I(Provide post-sale support)
I --> J(End)`


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
`


export default function Index() {

  const [diagram,  setDiagram] = useState(sop)
  const [isComplete, setIsComplete] = useState(true)

  const onMessageReceived = useCallback((message: string) => {
    console.log('onMessageReceived/message', message)
    setDiagram(message)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Diagram isComplete={isComplete} mermaidCode={diagram} />
      <FlowChat
        onMessageReceived={onMessageReceived}
        className={'absolute bottom-0 left-0 right-0'}
      />
    </div>
  );
}
