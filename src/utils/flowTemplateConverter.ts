import { FlowTemplate } from "../@types/flow";

export const flowTemplateConverter = (flow: FlowTemplate) => {
  const converted = convertFlowTemplateToDiagram(
    flow.BlockConfigurations,
    flow.TriggerConfigurationId,
  );

  return { flowDiagramBlocks: converted.blocks, flowDiagramLinks: converted.links };
};

function convertFlowTemplateToDiagram(blocks, startId) {
  const result = [];
  const links = [];
  const visited = new Set();

  function dfs(currentId, lastBlockId = null, lastForkArg = null) {
    if (!visited.has(currentId)) {
      const currentBlock = blocks[currentId];
      if (currentBlock) {
        currentBlock.lastBlockConfigurationId = lastBlockId;
        currentBlock.lastFork = lastForkArg;
        result.push({
          id: currentBlock.Id,
          type: "custom",
          data: {
            blockType: currentBlock.BlockType,
          },
          position: currentBlock.Position,
        });
        visited.add(currentId);

        if (lastBlockId) {
          links.push({
            id: `e-${lastBlockId}-${currentId}`,
            source: lastBlockId,
            target: currentId,
            label: lastForkArg,
          });
        }

        if (currentBlock.Arguments) {
          for (const argKey in currentBlock.Arguments) {
            const argId = currentBlock.Arguments[argKey];
            dfs(argId, currentId, argKey);
          }
        }

        const nextBlockId = currentBlock.NextBlockConfigurationId;
        if (nextBlockId) {
          dfs(nextBlockId, currentId, lastForkArg);
        }
      }
    }
  }

  dfs(startId);
  return { blocks: result, links };
}
