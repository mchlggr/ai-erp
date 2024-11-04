import { PropsWithChildren, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MiniMap,
  Background,
  Edge,
  Node,
  BackgroundVariant,
  ConnectionMode,
  ReactFlowProvider,
  NodeChange,
  useReactFlow,
  Position, applyEdgeChanges, EdgeChange, Connection, addEdge
} from '@xyflow/react';
import FlowEdge from './FlowEdge';
import FlowNode from './flow-node';
import dagre from 'dagre';
import { MermaidChartDirection, MermaidEdge, MermaidNode } from '@ai-erp/mermaid-flow';

// import { MermaidChartDirection } from "../../shared/models/mermaid.model";

// const introNode = {
//   id: 'intro',
//   // type: 'customNodeType',
//   position: { x: 100, y: -200 },
//   data: { label: 'Hello' },
// }

const nodeTypes = {
  customNodeType: FlowNode
};

const edgeTypes = {
  customEdgeType: FlowEdge
};

// TODO: replace with dynamic calculation
const nodeWidth = 250;
const nodeHeight = 200;

export interface FlowViewProps extends PropsWithChildren {
  initialNodes: MermaidNode[];
  initialEdges: MermaidEdge[];
  direction: MermaidChartDirection;
}

const n: Node = {
  data: {
    label: ''
  },
  id: '',
  position: {
    x: 0,
    y: 0
  },
  type: ''
};

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
const FlowView = (props: FlowViewProps): React.ReactNode => {
  const { initialNodes, initialEdges } = props;

  // react flow hooks
  const reactFlowInstance = useReactFlow();

  // shared states
  const [nodes, setNodes, onNodesChange] = useNodesState(transformMermaidNodes(initialNodes));
  const [edges, setEdges] = useEdgesState(transformMermaidEdges(initialEdges));

  useEffect(() => {
    const tranformedNodes = transformMermaidNodes(initialNodes);
    const tranformedEdges = transformMermaidEdges(initialEdges);

    setNodes(tranformedNodes);
    setEdges(tranformedEdges);

    updateGraphLayout(tranformedNodes, tranformedEdges, props.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialNodes, props.initialEdges, props.direction]);

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  /**
   * Updates the dagre graph layout
   *
   * @source https://reactflow.dev/examples/layout/dagre
   */
  const updateGraphLayout = (
    nodes: Node[],
    edges: Edge[],
    direction: MermaidChartDirection = MermaidChartDirection.TD
  ): { nodes: Node[]; edges: Edge[] } => {
    // const direction = MermaidChartDirection.TD
    const isHorizontal = direction === MermaidChartDirection.LR;

    // dagreGraph.setGraph({ rankdir: "TB" });
    dagreGraph.setGraph({});

    nodes.forEach((node: Node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: Edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: Node) => {
      // debugger
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? Position.Left : Position.Top;
      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      };

      return node;
    });

    setTimeout(() => {
      reactFlowInstance.fitView({
        duration: 1000,
        padding: 0.5,
        nodes: nodes
      });
    }, 500);

    return { nodes, edges };
  };

  const onCustomNodesChangeHandler = (changes: NodeChange[]): void => {
    onNodesChange(changes);
  };

  // console.log("flow-view/nodeTypes", nodeTypes)
  // console.log("flow-view/edgeTypes", edgeTypes)
  console.log('flow-view/nodes', nodes);
  console.log('flow-view/edges', edges);


  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        fill="transparent"
        stroke="black"
        strokeWidth="4"
        width="24"
        height="24"
        viewBox="0 0 100 100"
        className="absolute"
      >
        {/* arrow-end */}
        <marker
          id="arrow-end"
          viewBox="0 0 100 100"
          markerHeight={20}
          markerWidth={20}
          refX={50}
          refY={50}
        >
          {/* source: https://www.svgrepo.com/svg/108052/arrow-down-filled-triangle */}
          <path
            fill="#f6ab6c"
            stroke="#f6ab6c"
            d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
		c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
		c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"
          />
        </marker>
      </svg>

      {/* Reactflow Board */}
      <ReactFlow
        // fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        attributionPosition="bottom-left"
        elementsSelectable={true}
        connectionMode={ConnectionMode.Loose}
        onlyRenderVisibleElements={true}
        onNodesChange={onCustomNodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        {/*<MiniMap zoomable pannable className="minimap" />*/}
        <Background
          gap={20}
          className="erd-bg"
          variant={BackgroundVariant.Dots}
        />
      </ReactFlow>
    </>
  );
};

/**
 * Creates an ErdBuilder component wrapped with ReactFlowProvider, passing down the provided props.
 *
 * @param {FlowViewProps} props - the props to be passed down to the ErdBuilder component
 * @return {JSX.Element} the wrapped ErdBuilder component
 */
const FlowViewWithProvider = (props: FlowViewProps): React.ReactNode => {
  return (<>
      <ReactFlowProvider>
        <FlowView {...props} />
      </ReactFlowProvider>
    </>
  );
};

export default FlowViewWithProvider;
