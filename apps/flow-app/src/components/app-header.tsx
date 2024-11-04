import { SidebarTrigger } from '@ai-erp/shared-ui';
import Introduction from './introduction';

export function AppHeader() {
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
}

export default AppHeader;
