import { Handle, NodeProps, Position } from "reactflow";

const CustomNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="w-40 h-20 bg-slate-400">
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        className="w-6 h-6 rounded-md border-none"
        id="red"
      />

      <div className="flex justify-center items-center w-full h-full">
        <strong>{data.blockType}</strong>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-6 h-6 rounded-md border-none"
        id="blue"
      />
    </div>
  );
};

export default CustomNode;
