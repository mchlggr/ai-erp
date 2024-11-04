'use client';

import { AiChat, AiChatUI, useAiChatApi } from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';
import { PersonaOptions } from '@nlux/react';
import { PropsWithChildren, useCallback } from 'react';
import { cn } from '@ai-erp/shared-utils';

// Importing the syntax highlighter and its dark theme
import { highlighter } from '@nlux/highlighter';
import '@nlux/highlighter/dark-theme.css';

import '@nlux/themes/unstyled.css';
import '../theme-variables.css';
import { CircleUserRound, WandSparkles } from 'lucide-react';
import { Spinner } from '@ai-erp/shared-ui';


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

const adapterOptions: ChatAdapterOptions<string> = {
  dataTransferMode: 'batch',
  // url: 'http://127.0.0.1:80/diagram'
  url: '/diagram'
};

interface ChatProps {
  className?: string;
  onMessageReceived: (message: string) => void;
}

const FlowChat = ({ className, onMessageReceived }: ChatProps) => {
  const adapter = useChatAdapter(adapterOptions);
  const api = useAiChatApi();
  const onResetClick = useCallback(() => api.conversation.reset(), [api]);
  const onSendClick = useCallback(() => api.composer.send('This is the reset message'), [api]);
  const messageReceived = useCallback((payload: { message: string }) => {
    // debugger
    // onMessageReceived(payload.message.join(""))
    onMessageReceived(payload.message);
  }, [onMessageReceived]);

  return (<div className={cn(className, 'h-full w-full py-8 px-10')}
      // style={{ backgroundColor: '#ebf8ff' }}
    >
      <AiChat
        // width={'100%'}
        // height={'100%'}
        api={api}

        adapter={adapter}
        events={{ messageReceived }}
        className={'flex justify-center items-end w-full h-full'}
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
  );
};

export { FlowChat };
