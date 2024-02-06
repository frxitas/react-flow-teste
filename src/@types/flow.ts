import { BlockConfiguration } from "./block";

export interface FlowTemplate {
    Id: string;
    Name: string;
    Version: string;
    DraftVersion: string;
    PreviousVersion: string;
    Tenant: string;
    TriggerConfigurationId: string | null;
    BlockConfigurations: { [key: string]: BlockConfiguration; };
}