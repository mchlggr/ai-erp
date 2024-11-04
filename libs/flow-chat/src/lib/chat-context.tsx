import { createContextAdapter } from '@nlux/nlbridge-react';
import { AiContext, createAiContext, useAiContext, useAiTask } from '@nlux/react';
import { PropsWithChildren, useMemo } from 'react';

const contextAdapter = createContextAdapter()
  .withUrl('http://localhost:8899');

const ChatContext = createAiContext(contextAdapter);

// ContextItemData is a union type that can be a number, string, boolean, null, object, or array of ContextItemData
type ContextItemData = number | string | boolean | null | ContextObject | ContextItemData[];
type ContextObject = {
    [key: string]: ContextItemData;
};

const useAiContextDiagram = (contextAdapter: AiContext, diagramText: ContextItemData) => useAiContext(contextAdapter, "Current Diagram", diagramText);

type ChatContextProviderProps = PropsWithChildren;
const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const initialContextItems = useMemo(() =>
      ({
        'appName': {
          value: 'Flow Diagram Assistant',
          description: 'The name of the application being used'
        },
        'appVersion': {
          value: '0.1.0',
          description: 'The version of the application'
        }
      })
    , []);

  return <ChatContext.Provider initialItems={initialContextItems}>
    {children}
  </ChatContext.Provider>;
};

export { useAiTask, useAiContextDiagram, ChatContext, ChatContextProvider };
