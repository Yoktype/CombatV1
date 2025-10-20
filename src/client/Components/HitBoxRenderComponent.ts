import { ReplicatedStorage, Workspace } from "@rbxts/services";


const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;


function destroyHitboxRender(): void {

}

function spawnHitboxRender(position: CFrame): void {

    // for what i get player
    const render = new Instance("Part");
    render.Parent = Workspace; // local player spawn only for player
    render.PivotTo(position);
    render.Name = "HitboxRender";

    task.delay(3, () => {

    })
}



hitBoxRenderEvent.OnClientEvent.Connect((args) => {
    const renderParams = args as HitboxRender; // init my types

    if (renderParams.owner !== undefined) {
        spawnHitboxRender(renderParams.position);
    }
})

