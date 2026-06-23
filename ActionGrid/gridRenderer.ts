import { IInputs } from "./generated/ManifestTypes";
import { ActionGridConfig, DataSet } from "./types";
import { getBooleanRecordValue, getRecordStringValue, isEmpty } from "./valueHelpers";
import { updatePhoneForRecord } from "./phoneAction";

const EXISTING_SUFFIX = " (existant)";

export function renderGrid(
    container: HTMLDivElement,
    context: ComponentFramework.Context<IInputs>,
    dataset: DataSet,
    config: ActionGridConfig
): void {
    container.innerHTML = "";

    if (!config.targetColumn) {
        container.innerText = "Configuration manquante : TargetColumn.";
        return;
    }

    if (dataset.loading) {
        container.innerText = "Chargement...";
        return;
    }

    const hiddenColumns = [
        config.hasItColumn
    ].filter((columnName) => columnName);

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.fontFamily = "Segoe UI, Arial, sans-serif";
    table.style.fontSize = "14px";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    dataset.columns.forEach((column) => {
        if (hiddenColumns.includes(column.name)) return;

        const th = document.createElement("th");
        th.innerText = column.displayName;
        th.style.textAlign = "left";
        th.style.padding = "8px";
        th.style.borderBottom = "1px solid #ddd";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    dataset.sortedRecordIds.forEach((recordId) => {
        const record = dataset.records[recordId];
        const row = document.createElement("tr");

        dataset.columns.forEach((column) => {
            if (hiddenColumns.includes(column.name)) return;

            const td = document.createElement("td");
            td.style.padding = "8px";
            td.style.borderBottom = "1px solid #eee";

            const columnName = column.name;
            const value = record.getFormattedValue(columnName);

            if (columnName === config.photoColumn) {
                const photoUrl = getRecordStringValue(record, columnName);

                if (photoUrl) {
                    const img = document.createElement("img");
                    img.src = photoUrl;
                    img.alt = "Photo";
                    img.style.width = "36px";
                    img.style.height = "36px";
                    img.style.borderRadius = "50%";
                    img.style.objectFit = "cover";

                    td.appendChild(img);
                }

                row.appendChild(td);
                return;
            }

            if (columnName === config.linkedInColumn) {
                const linkedInUrl = getRecordStringValue(record, columnName);

                if (linkedInUrl) {
                    const link = document.createElement("a");
                    link.href = linkedInUrl;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.innerText = "in";
                    link.style.fontWeight = "bold";
                    link.style.fontSize = "16px";
                    link.style.textDecoration = "none";

                    td.appendChild(link);
                }

                row.appendChild(td);
                return;
            }

            if (columnName === config.targetColumn && isEmpty(value)) {
                const hasIt = getBooleanRecordValue(record, config.hasItColumn);
                const label = hasIt
                    ? `${config.emptyLabel}${EXISTING_SUFFIX}`
                    : config.emptyLabel;

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
            } else {
                td.innerText = value || "";
            }

            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}