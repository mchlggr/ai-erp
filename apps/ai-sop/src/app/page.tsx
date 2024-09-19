'use client';

import { useCallback, useState } from 'react';
import { Chat } from '../components/chat';
import Diagram from '../components/diagram';


export const mermaidCode1 = `graph LR
start[Start] --> type_username[Type Username]
type_username --> type_password[Type Password]
type_password --> click_button[Click on Button]
click_button -->|Success| check_title[Check Home Page Title]
click_button -->|Error| check_alert[Check Alert Message]
check_title --> finish[Finish]
check_alert --> finish`;


export const sampleMermaidCode2 = `graph TD
Start["Start ¡!startEvent!¡"]
Username["Type username ¡!activity!¡"]
Password["Type password ¡!activity!¡"]
Button["Click on the button ¡!activity!¡"]
Success["Check home page title ¡!activity!¡"]
Error["Check alert message ¡!activity!¡"]
Finish["Finish ¡!endEvent!¡"]

Start --> Username
Username --> Password
Password --> Button
Button --> Success
Button --> Error
Success --> Finish
Error --> Finish`;

const simpleTD = `graph TD
    A(Start) --> B(Activity)
    B --> C(Activity)
    C --> D(Activity)
    D --> E(Activity)
    E --> F(Activity)
    F --> G(End)
`

const mcdonalds = `graph TD
A[Enter McDonald's] --> B{Are you dining in or taking out?}
B --> |Dining in| C[Choose a table]
B --> |Taking out| D[Place order at counter]`


export default function Index() {

  const [diagram,  setDiagram] = useState(mcdonalds)
  const [isComplete, setIsComplete] = useState(true)

  const onMessageReceived = useCallback((message: string) => {
    console.log('onMessageReceived/message', message)
    setDiagram(message)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Diagram isComplete={isComplete} mermaidCode={diagram} />
      <Chat
        onMessageReceived={onMessageReceived}
        className={'absolute bottom-0 left-0 right-0'}
      />
    </div>
  );
}
