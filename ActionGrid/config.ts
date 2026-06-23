import { IInputs } from "./generated/ManifestTypes";
import { ActionGridConfig } from "./types";

const DEFAULT_EMPTY_LABEL = "XXXXXXXXXX";

export function getConfig(context: ComponentFramework.Context<IInputs>): ActionGridConfig {
    return {
        targetColumn: context.parameters.TargetColumn.raw?.trim() || "",
        emptyLabel: context.parameters.EmptyLabel.raw?.trim() || DEFAULT_EMPTY_LABEL,
        hasItColumn: context.parameters.HasIt.raw?.trim() || "",
        photoColumn: context.parameters.PhotoColumn.raw?.trim() || "",
        linkedInColumn: context.parameters.LinkedInColumn.raw?.trim() || "",
        defaultAvatarUrl: context.parameters.DefaultAvatarUrl.raw?.trim() || ""
    };
}