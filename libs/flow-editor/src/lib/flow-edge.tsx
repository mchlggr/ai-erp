import { FC, MutableRefObject, useRef } from 'react';
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge
} from '@xyflow/react';
import { cn } from '@ai-erp/shared-utils';
import { edgeStrokeColor } from './themes';


const FlowEdge: FC<EdgeProps> = (props) => {
  const {
    id,
    style,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    label="",
    markerEnd,
    markerStart
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const contentEditableLabelRef: MutableRefObject<HTMLDivElement | undefined> =
    useRef<HTMLDivElement>();

  function onLabelClick(): void {
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
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        interactionWidth={50}
        style={style}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      <EdgeLabelRenderer>
        <div
          contentEditable="true"
          onClick={onLabelClick}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            display: label && label !== "" ? 'block' : 'none',
            backgroundColor: edgeStrokeColor
          }}
          onBlur={onLabelBlur}
          suppressContentEditableWarning={true}
          className={cn('custom-edge-label', 'nodrag', 'nopan',
            `absolute text-white rounded text-xs font-medium p-2.5 pointer-events-auto;`
          )}
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default FlowEdge;
