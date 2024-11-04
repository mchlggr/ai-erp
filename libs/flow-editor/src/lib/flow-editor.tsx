'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Node,
  Edge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowView from './flow-view';
import {
  MermaidChartDirection,
  MermaidEdge,
  MermaidNode,
  parseMermaidChart,
} from '@ai-erp/mermaid-flow';
import { nanoid } from 'nanoid';
import { edgeStrokeColor, edgeStrokeWidth } from './themes';

interface DiagramProps {
  mermaidCode?: string;
  isComplete?: boolean;
}

export const makeEdge = (data: Edge): Edge => {
  const { id, ...rest } = data;
  return {
    type: 'flowEditorEdge',
    markerStart: 'oneOrMany',
    style: {
      stroke: edgeStrokeColor,
      strokeWidth: edgeStrokeWidth,
      strokeDasharray: '0',
    },
    selectable: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edgeStrokeColor,
    },
    animated: false,
    id,
    ...rest,
  };
};

const editorEdge = (mermaidEdge: MermaidEdge): Edge => {
  return makeEdge({
    id: nanoid(),
    source: mermaidEdge.start,
    target: mermaidEdge.end,
    label: mermaidEdge.text,
    data: {
      label: mermaidEdge.text,
      raw: mermaidEdge,
    },
  });
};

const editorNode = (
  mermaidNode: MermaidNode,
  index: number,
  direction: MermaidChartDirection
): Node => {
  return {
    id: mermaidNode.id,
    position: { x: index * 200, y: index * 200 },
    data: {
      label: mermaidNode.text,
      raw: mermaidNode,
      layoutDirection: direction,
    },
    type: 'flowEditorNode',
    dragHandle: '.flow-editor-node-handle',
  };
};

const FlowEditor = ({ mermaidCode = '', isComplete = false }: DiagramProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [direction, setDirection] = useState<string>('LR');

  useEffect(() => {
    async function parse() {
      const { nodes, edges, direction } = await parseMermaidChart(mermaidCode);

      setEdges(edges.map((i) => editorEdge(i)));
      setNodes(nodes.map((i, index) => editorNode(i, index, direction)));
      setDirection(direction);
    }

    if (isComplete && mermaidCode) {
      parse();
    }
  }, [mermaidCode, isComplete]);


  useEffect(() => {
    // Hide reactflow.dev link
    const elm = document.querySelector('[href="https://reactflow.dev"]');
    if (elm) (elm as HTMLElement).style.display = 'none';
  }, []);

  return (
    <FlowView
      className={'flow-editor'}
      initialNodes={nodes}
      initialEdges={edges}
      direction={MermaidChartDirection.TD}
    />
  );
};

export { FlowEditor };
