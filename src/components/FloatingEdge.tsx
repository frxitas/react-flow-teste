import { useCallback } from "react";
import { useStore, getBezierPath, EdgeProps } from "reactflow";

import { getEdgeParams } from "../utils";

const FloatingEdge = ({ id, source, target, markerEnd, style }: EdgeProps) => {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));
  console.log(style)

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <path
      id={id}
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
};

export default FloatingEdge;
