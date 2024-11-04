import { Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ai-erp/shared-ui';

export function Introduction() {

  const features = [
    [true, 'Basic natural language parsing for generating flowchart'],
    [true, 'Simple node and connection creation'],
    [true, 'Minimal SVG-based diagram rendering'],
    [true, 'Demo implementation using mermaid.js or similar library'],
    [true, 'Example prompts and responses'],
    [false, 'Login to save and revisit previous chart chats'],
    [false, 'Natural language commands to manipulate diagram details'],
    [false, 'Select nodes and prompt diagram changes'],
    [false, 'Voice input to generate and manipulate diagrams'],
    [false, 'Convert process diagram into guided application'],
  ];

  return (
    <Dialog>
      <DialogTrigger>
        <Info className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'text-2xl mb-2'}>AI Flowchart Assistant</DialogTitle>
          <DialogDescription className={'text-black space-y-4'}>
            <p>
              A simple project experimenting with how to build an AI-powered flowchart diagramming assistant.
            </p>
            <h2 className="text-lg font-bold">
              Overview
            </h2>
            <p>
              This project showcases basic integration between an AI model and flowchart tools, allowing
              a focused space to experiment with prompting for diagram generation.
            </p>
            <h2 className="text-lg font-bold">Features</h2>
            <ul className={'gap-y-2'}>
              {features.map(([done, description], index) => (
                <li key={index}>
                  <input type="checkbox" checked={!!done} disabled className="mr-2" />
                  {description}
                </li>
              ))}
            </ul>
           <p>
             Project repository available at:&nbsp;<a href={"#"}>@mchlggr/flow-chat</a>
           </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Introduction;
