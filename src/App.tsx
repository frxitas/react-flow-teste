import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import { useCallback } from "react";
import FloatingEdge from "./components/FloatingEdge";
import CustomNode from "./components/CustomNode";
import CustomConnectionLine from "./components/CustonConnectionLine";
import { flowTemplateConverter } from "./utils/flowTemplateConverter";
import { flowTemplate } from "./utils/flowTemplate";

const edgeTypes = {
  floating: FloatingEdge,
};

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const flowConverted = flowTemplateConverter(flowTemplate);
  console.log(flowConverted)

  const [nodes, , onNodesChange] = useNodesState(flowConverted.flowDiagramBlocks);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowConverted.flowDiagramLinks);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "floating" }, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionLineComponent={CustomConnectionLine}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

export default App;
