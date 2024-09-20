import mermaid from 'mermaid';
import { ParserDefinition } from 'mermaid/dist/diagram-api/types.js';
import { IMermaidEdgeDefinition, IMermaidNodeDefinition } from './mermaid-types';

type MermaidParserResponse = {
  nodes: IMermaidNodeDefinition[];
  edges: IMermaidEdgeDefinition[];
  direction: string;
}

// window.mermaidInit = false;
mermaid.initialize({ startOnLoad: false });


export async function parseMermaidChart(graphDefinitionText: string): Promise<MermaidParserResponse> {
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(
    graphDefinitionText
  );
  console.log("/diagram", diagram)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser = (diagram.getParser() as ParserDefinition as any).yy;

  const mermaidEdges = (parser.getEdges() as IMermaidEdgeDefinition[]) || [];
  const mermaidNodes = (parser.getVertices() as IMermaidNodeDefinition[]) || [];

  console.log("/mermaidEdges", mermaidEdges)
  console.log("/mermaidNodes", mermaidNodes)
  console.log("/parser.getDirection()", parser.getDirection())

  const nodes = Object.values(mermaidNodes)
  console.log("/nodes", nodes)
  // debugger

  return {
    nodes: [...mermaidNodes.values()],
    edges: mermaidEdges,
    direction: parser.getDirection()
  };
}
