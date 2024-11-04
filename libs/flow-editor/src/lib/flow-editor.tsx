'use client';

import React, { useEffect, useMemo } from 'react';
import mermaid from 'mermaid';
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  EdgeChange,
  Node,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Connection,
  Edge,
  MarkerType, MiniMap, useNodesState, useEdgesState, BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowView from './flow-view';
import { CustomNode } from './custom-node';
import { parseMermaidCode } from '../utils/mermaid-utils';
import { MermaidChartDirection, MermaidEdge, MermaidNode, parseMermaidChart } from '@ai-erp/mermaid-flow';
import { nanoid } from 'nanoid';

interface DiagramProps {
  mermaidCode?: string;
  isComplete?: boolean;
}


// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } }
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const editorEdge= (mermaidEdge: MermaidEdge): Edge => {
  return {
            id: nanoid(),
            source: mermaidEdge.start,
            target: mermaidEdge.end,
            type: "customEdgeType",
            markerStart: "oneOrMany",
            // markerEnd: "arrow-end",
            style: { stroke: "#f6ab6c" },
            // elementsSelectable: true,
            selectable: true,
            label: mermaidEdge.text,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            animated: false,
            data: {
              label: mermaidEdge.text,
              raw: mermaidEdge,
            },
          }
}

const editorNode= (mermaidNode: MermaidNode, index: number, direction: MermaidChartDirection): Node => {
  return {
    id: mermaidNode.id,
    position: { x: index * 200, y: index * 200 },
    type: "customNodeType",
    dragHandle: ".flow-editor-node-handle",
    data: {
      label: mermaidNode.text,
      raw: mermaidNode,
      layoutDirection: direction,
    },
  }
}

const transformMermaidNodes = (nodes: MermaidNode[]): Node[] => {
  return [...nodes.map((node) => {
    return {
      id: node.id,
      data: { label: node.text },
      type: 'default',
      // We are using daigre to auto layout the nodes, this is just a placeholder
      position: { x: 0, y: 0 }
    };
  })
    // introNode
  ];
};
const transformMermaidEdges = (edges: MermaidEdge[]): Edge[] => {
  return [...edges.map((edge) => {
    // start: 'A', end: 'B', type: 'arrow_point', text: '', labelType: 'text', …
    // debugger
    return {
      ...edge,
      id: `${edge.start}-${edge.end}`,
      source: edge.start,
      target: edge.end,
      type: 'default'
    };
  })];
};



const FlowEditor = ({ mermaidCode = '', isComplete = false }: DiagramProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [direction, setDirection] = useState<string>('LR');

  useEffect(() => {
    async function parse() {
      const { nodes, edges, direction } = await parseMermaidChart(mermaidCode);

      // const tranformedNodes = transformMermaidNodes(nodes);
      // const tranformedEdges = transformMermaidEdges(edges);
    // setNodes(tranformedNodes);
    // setEdges(tranformedEdges);


      setEdges(edges.map((i) =>editorEdge(i)));
      setNodes(nodes.map((i, index) => editorNode(i, index, direction)));
      setDirection(direction);
    }

    if (isComplete && mermaidCode) {
      parse();
    }
  }, [mermaidCode, isComplete]);

  // useEffect(() => {
  //   async function parse() {
  //     const { nodes, edges } = await parseMermaidCode(mermaidCode);
  //     console.log('nodes', nodes);
  //     console.log('edges', edges);
  //     setEdges(edges);
  //     setNodes(nodes);
  //   }
  //   if (isComplete && mermaidCode) {
  //     parse();
  //   }
  // }, [mermaidCode, isComplete]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      startEvent: CustomNode,
      endEvent: CustomNode,
      activity: CustomNode
    }),
    []
  );

  useEffect(() => {
    // Hide reactflow.dev link
    const elm = document.querySelector('[href="https://reactflow.dev"]');
    if (elm) (elm as HTMLElement).style.display = 'none';
  }, []);

  return (
    <FlowView
      className={'flow-editor'}
      initialNodes={nodes}
      // onNodesChange={onNodesChange}
      initialEdges={edges}
      direction={MermaidChartDirection.TD}
      // edges={[
      //   { id: 'e1-2', source: 'Start', target: 'Username' },
      // ]}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      // nodeTypes={nodeTypes}
    >
      {/*<MiniMap/>*/}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/*<Controls />*/}
    </FlowView>
  );
};


export { FlowEditor };
