import { IInputs } from "./generated/ManifestTypes";
import { DataSet } from "./types";

const TEST_PHONE_VALUE = "TEST 123456789";

export async function updatePhoneForRecord(
    context: ComponentFramework.Context<IInputs>,
    dataset: DataSet,
    recordId: string,
    targetColumn: string
): Promise<void> {
    const record = dataset.records[recordId];
    const entityName = dataset.getTargetEntityType();
    const id = record.getRecordId();

    if (!targetColumn) {
        throw new Error("TargetColumn est vide.");
    }

    // TEST actuel : valeur fixe.
    const phone = TEST_PHONE_VALUE;

    // Version finale :
    // const phone = await callCustomApi(context, entityName, id, targetColumn);

    if (!phone || phone.trim() === "") {
        throw new Error("Aucun numéro retourné.");
    }

    const dataToUpdate: Record<string, string> = {};
    dataToUpdate[targetColumn] = phone;

    await context.webAPI.updateRecord(entityName, id, dataToUpdate);

    dataset.refresh();
}