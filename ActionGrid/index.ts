import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { getConfig } from "./config";
import { renderGrid } from "./gridRenderer";

export class ActionGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container!: HTMLDivElement;
    private context!: ComponentFramework.Context<IInputs>;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.context = context;
        this.container = container;
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.overflow = "auto";
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.context = context;

        const config = getConfig(context);

        renderGrid(
            this.container,
            context,
            context.parameters.sampleDataSet,
            config
        );
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        this.container.innerHTML = "";
    }
}