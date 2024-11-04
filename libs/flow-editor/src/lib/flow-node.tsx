import { MutableRefObject, memo, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Tooltip } from 'react-tooltip';
import Markdown from 'react-markdown';
import { MermaidChartDirection } from '@ai-erp/mermaid-flow';
import { cn } from '@ai-erp/shared-utils';
import {
  nodeBackgroundColor,
  nodeTextColor,
  tooltipBackgroundColor,
  tooltipTextColor,
} from './themes';

export interface IRFCustomNodeProps {
  id: string;
  data: {
    label: string;
    layoutDirection: MermaidChartDirection;
  };
  isConnectable: boolean;
}

const FlowNode = memo(({ id, data, isConnectable }: IRFCustomNodeProps) => {
  const contentEditableLabelRef: MutableRefObject<HTMLDivElement | undefined> =
    useRef<HTMLDivElement>();

  function onLabelDoubleClick(): void {
    if (contentEditableLabelRef.current) {
      contentEditableLabelRef.current.contentEditable = 'true';
      contentEditableLabelRef.current.focus();
    }
  }

  function onLabelBlur(): void {
    if (contentEditableLabelRef.current) {
      contentEditableLabelRef.current.contentEditable = 'false';
    }
  }

  return (
    <div
      className={cn(
        'flow-editor-node-handle',
        'px-8 py-4 min-w-40 text-center rounded-lg border shadow-md',
        'border-[#e9d8fd]',
        'bg-[#e9d8fd]'
      )}
      onDoubleClick={onLabelDoubleClick}
      style={{ boxShadow: '4px 4px 0px 0px rgba(69, 53, 122, 0.5)' }}
    >
      <Handle
        id={id}
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <Tooltip
        delayShow={1000}
        variant="info"
        id="double-click-to-edit"
        place={
          data.layoutDirection === MermaidChartDirection.LR ? 'bottom' : 'right'
        }
        content="Double Click to Edit"
        style={{
          backgroundColor: tooltipBackgroundColor,
          color: tooltipTextColor,
        }}
      />
      <div
        data-tooltip-id="double-click-to-edit"
        ref={contentEditableLabelRef as MutableRefObject<HTMLDivElement>}
        contentEditable="false"
        onBlur={onLabelBlur}
        suppressContentEditableWarning={true}
        className={cn(
          'flow-editor-node-label-handle',
          `bg-[${nodeBackgroundColor}] cursor-pointer px-2.5 py-0.75 rounded-full transition-all duration-300 ease-in-out`,
          `text-[${nodeTextColor}]`,
          'text-[#44347a]',
          'font-bold'
        )}
      >
        <Markdown>{data.label}</Markdown>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />

      <Handle
        id={id}
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default FlowNode;
