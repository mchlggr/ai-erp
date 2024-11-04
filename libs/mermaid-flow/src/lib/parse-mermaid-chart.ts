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
const emptyChartResponse: MermaidParserResponse = Object.freeze({ nodes: [], edges: [], direction: "LR" });

export async function parseMermaidChart(graphDefinitionText: string): Promise<MermaidParserResponse> {
  const d = await mermaid.parse(graphDefinitionText);
  const a= d.config

  const diagram = await mermaid.mermaidAPI.getDiagramFromText(
    graphDefinitionText
  );

  const parseResult = await mermaid.parse(graphDefinitionText);
  const renderResult = await mermaid.render("graphDiv", graphDefinitionText);

  const parser = diagram.getParser().parser?.yy

  if(!parser) return emptyChartResponse


  const mermaidEdges = (parser.getEdges() as IMermaidEdgeDefinition[]) || [];
  const mermaidNodes = (parser.getVertices() as IMermaidNodeDefinition[]) || [];

  const nodes = Object.values(mermaidNodes)

  return {
    nodes: [...mermaidNodes.values()],
    edges: mermaidEdges,
    direction: parser.getDirection()
  };
}
