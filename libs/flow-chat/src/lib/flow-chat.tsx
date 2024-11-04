'use client';

import { AiChat, useAiChatApi } from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';
import { PersonaOptions } from '@nlux/react';
import { useCallback } from 'react';

export const personasOptions: PersonaOptions = {
  user: {
    name: 'Me',
    avatar: 'https://docs.nlkit.com/nlux/images/personas/alex.png'
  },
  assistant: {
    name: 'Business Diagramming Assistant',
    avatar: 'https://docs.nlkit.com/nlux/images/personas/feather.png',
    tagline: 'Yer AI First Mate!'
  }
};

const adapterOptions: ChatAdapterOptions<string> = {
  dataTransferMode: 'batch',
  url: 'http://127.0.0.1:8000/diagram'
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
    onMessageReceived(payload.message)
  }, [onMessageReceived])

  return (<div className={className}>
      <AiChat
        // width={'100%'}
        api={api}
        adapter={adapter}
        events={{ messageReceived }}
        className={'flex justify-center items-end w-full'}
        personaOptions={personasOptions}
        displayOptions={{ colorScheme: 'dark' }}
        composerOptions={{
          placeholder: 'How can I help you today?'
        }}
      />
    </div>
  );
};

export { FlowChat };
