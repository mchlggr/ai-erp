import mermaid from 'mermaid';
import { MermaidChartDirection, MermaidEdge, MermaidNode } from './mermaid-types';

type MermaidParserResponse = {
  nodes: MermaidNode[];
  edges: MermaidEdge[];
  direction: MermaidChartDirection;
}

mermaid.initialize({ startOnLoad: false });

const emptyChartResponse: MermaidParserResponse = Object.freeze({ nodes: [], edges: [], direction: MermaidChartDirection.TD });

export async function parseMermaidChart(graphDefinitionText: string): Promise<MermaidParserResponse> {

  const diagram = await mermaid.mermaidAPI.getDiagramFromText(
    graphDefinitionText
  );

  const parser = diagram.getParser().parser?.yy

  if(!parser) return emptyChartResponse


  // @ts-expect-error mermaid.js types are incorrect
  const mermaidEdges = (parser.getEdges() as MermaidEdge[]) || [];

    // @ts-expect-error mermaid.js types are incorrect
  const mermaidNodes = (parser.getVertices() as MermaidNode[]) || [];

  const nodes = Object.values(mermaidNodes)

  let mermaidDirection = MermaidChartDirection.TD

  // @ts-expect-error mermaid.js types are incorrect
  if(parser.getDirection() === "LR") mermaidDirection = MermaidChartDirection.LR

  return {
    nodes: [...mermaidNodes.values()],
    edges: mermaidEdges,
    direction: mermaidDirection
  };
}
