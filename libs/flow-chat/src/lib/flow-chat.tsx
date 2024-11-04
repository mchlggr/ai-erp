'use client';

import {
  AiChat,
  AiChatUI,
  useAiChatApi,
} from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';
import { PersonaOptions } from '@nlux/react';
import { PropsWithChildren, useCallback } from 'react';
import { cn } from '@ai-erp/shared-utils';

// Importing the syntax highlighter and its dark theme
import { highlighter } from '@nlux/highlighter';
import '@nlux/highlighter/dark-theme.css';

import '@nlux/themes/unstyled.css';
import '../theme-variables.css';
import { CircleUserRound, Undo2, WandSparkles } from 'lucide-react';
import { Button, Spinner } from '@ai-erp/shared-ui';
import { flowServerDiagramUrl } from './chat-adapter';


const AvatarContainer = (props: PropsWithChildren & { foreground?: string, background?: string }) => {
  return <div className={'flex w-full h-full justify-center items-center bg-secondary rounded-full'}
              style={{ backgroundColor: props.background, color: props.foreground }}>
    {props.children}
  </div>;
};

const UserAvatar = () => {
  return <AvatarContainer background={'#805ad5'} foreground={'#fff'}>
    <CircleUserRound />
  </AvatarContainer>;
};

const WandAvatar = () => {
  return <AvatarContainer background={'#e9d8fd'} foreground={'#44347a'}>
    <WandSparkles />
  </AvatarContainer>;
};

export const personasOptions: PersonaOptions = {
  user: {
    name: 'Me',
    avatar: <UserAvatar />
  },
  assistant: {
    name: 'Flowchart Assistant',
    avatar: <WandAvatar />,
    tagline: 'A simple project experimenting with how to build an AI-powered flowchart diagramming assistant.'
  }
};

const adapterOptions: ChatAdapterOptions<[string]> = {
  dataTransferMode: 'stream',
  url: flowServerDiagramUrl,
  inputPreProcessor: (input: string,  conversationHistory=[],
) => {
    return {
      message: [
        "Here is the conversation history:",
        conversationHistory.map((item) => item.message),
        "Now, here is the new user input:",
        input
      ].join('\n')
    }
  },
};


interface ChatProps {
  className?: string;
  onMessageReceived: (message: string) => void;
}

const FlowChat = ({ className, onMessageReceived }: ChatProps) => {
  const adapter = useChatAdapter(adapterOptions);

  const api = useAiChatApi();
  const messageReceived = useCallback((payload: { message: string[] }) => {
    onMessageReceived(payload.message.join(''));
  }, [onMessageReceived]);
  const onResetClick = useCallback(() => api.conversation.reset(), [api]);

  return (<div className={cn(className, 'flex flex-1 flex-col h-full w-full py-8 px-10')}>
    <div className={'flex justify-between items-center mb-8'}>
      <Button variant={'outline'} onClick={onResetClick}>
       <Undo2 />
        Reset
      </Button>
    </div>
    <AiChat
      api={api}
      adapter={adapter}
      events={{ messageReceived }}
      className={'flex justify-center items-end flex-1'}
      personaOptions={personasOptions}
      messageOptions={{ syntaxHighlighter: highlighter }}
      displayOptions={{
        colorScheme: 'light',
        themeId: 'FlowChat'
      }}
      composerOptions={{
        placeholder: 'What do you want to diagram?'
      }}
      conversationOptions={{
        conversationStarters: [
          {
            label: 'Generate Simple Sales Flowchart',
            prompt: 'Generate a flowchart for a high-performance external sales team'
          },
          {
            label: 'Complex Example Flowchart',
            prompt: 'Generate a flowchart with many steps and branches'
          },
          { label: 'For Sell by Owner Steps', prompt: 'What are the steps for selling a house by owner?' }
        ]
      }}
    >
      <AiChatUI.Loader>
        <Spinner />
      </AiChatUI.Loader>
    </AiChat>
</div>
)
  ;
};

export { FlowChat };
