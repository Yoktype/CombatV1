import { ReplicatedStorage, Workspace } from "@rbxts/services";


const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;


function destroyHitboxRender(render: BasePart): void {

    // tweenservice for smoth transparansy and destory
}

function spawnHitboxRender(position: CFrame): void {

    // for what i get player
    const render = new Instance("Part");
    render.Parent = Workspace; // local player spawn only for player
    render.PivotTo(position);
    render.Name = "HitboxRender";
    render.Anchored = true;
    render.CanCollide = false;
    render.Color = Color3.fromRGB(255, 0, 0);

    task.delay(3, () => {
        // change this function on destroyHitboxRender
    })
}


hitBoxRenderEvent.OnClientEvent.Connect((args) => {
    const renderParams = args as HitboxRender; // init my types

    if (renderParams.owner !== undefined) {
        spawnHitboxRender(renderParams.position);
    }
})

