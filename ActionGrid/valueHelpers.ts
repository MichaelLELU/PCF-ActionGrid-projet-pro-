import { EntityRecord } from "./types";

export function isEmpty(value: string | null | undefined): boolean {
    return !value || value.trim() === "";
}

export function getBooleanRecordValue(record: EntityRecord, columnName: string): boolean {
    if (!columnName) return false;

    const rawValue = record.getValue(columnName);

    return rawValue === true ||
        rawValue === "true" ||
        rawValue === "True" ||
        rawValue === "1" ||
        rawValue === 1;
}

export function getRecordStringValue(
    record: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
    columnName: string
): string {
    if (!columnName) return "";

    const formattedValue = record.getFormattedValue(columnName);
    if (formattedValue) return formattedValue;

    const rawValue = record.getValue(columnName);
    return rawValue ? String(rawValue) : "";
}