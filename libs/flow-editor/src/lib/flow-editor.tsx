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

interface DiagramProps {
  mermaidCode?: string;
  isComplete?: boolean;
}


// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } }
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const FlowEditor = ({ mermaidCode = '', isComplete = false }: DiagramProps) => {


  useEffect(() => {
    async function parse() {
      const { nodes, edges, direction } = await parseMermaidChart(mermaidCode);
      console.log('texthowere/nodes', nodes);
      console.log('edges', edges);
      console.log('/direction', direction);
      setEdges(edges);
      setNodes(nodes);
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

  const [nodes, setNodes] = useState<MermaidNode[]>([]);
  const [edges, setEdges] = useState<MermaidEdge[]>([]);
  const [direction, setDirection] = useState<string>('LR');

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
