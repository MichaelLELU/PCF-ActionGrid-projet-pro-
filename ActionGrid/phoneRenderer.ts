import { IInputs } from "./generated/ManifestTypes";
import { ActionGridConfig, DataSet } from "./types";
import { getBooleanRecordValue, isEmpty } from "./valueHelpers";
import { updatePhoneForRecord } from "./phoneAction";

const EXISTING_SUFFIX = " (existant)";

export function renderPhoneCell(
    td: HTMLTableCellElement,
    context: ComponentFramework.Context<IInputs>,
    dataset: DataSet,
    recordId: string,
    value: string | null | undefined,
    config: ActionGridConfig
): void {
    if (isEmpty(value)) {
        const hasIt = getBooleanRecordValue(dataset.records[recordId], config.hasItColumn);
        const label = hasIt ? `${config.emptyLabel}${EXISTING_SUFFIX}` : config.emptyLabel;

        const link = document.createElement("a");
        link.href = "#";
        link.innerText = label;
        link.style.cursor = "pointer";

        link.onclick = async (event) => {
            event.preventDefault();

            link.innerText = "Recherche...";
            link.style.pointerEvents = "none";

            try {
                await updatePhoneForRecord(
                    context,
                    dataset,
                    recordId,
                    config.targetColumn
                );
            } catch (error) {
                console.error(error);
                link.innerText = "Erreur";
                link.style.pointerEvents = "auto";
            }
        };

        td.appendChild(link);
        return;
    }

    const phoneLink = document.createElement("a");
    phoneLink.href = `tel:${value}`;
    phoneLink.innerText = value || "";
    phoneLink.style.cursor = "pointer";

    td.appendChild(phoneLink);
}