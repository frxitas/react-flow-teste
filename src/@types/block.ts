import { BlockType } from "./blockType";

export interface BlockConfiguration {
  Id: string;
  BlockType: BlockType;
  NextBlockConfigurationId: string | null;
  Tenant: string;
  FlowId: string;
}

export interface ForkBlock extends BlockConfiguration {
  Arguments: { [key: string]: string };
}

export class BlockForkConverter {
  public BlockForkConverter(block: BlockConfiguration){
    


  }
}

