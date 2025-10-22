import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";


const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;


function destroyHitboxRender(render: BasePart): void {
    const tweenInfo = new TweenInfo(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, 0, false, 0)
    const propertyTable = {
        Transparency: 1,
    }

    const tweenCreate = TweenService.Create(render, tweenInfo, propertyTable);
    tweenCreate.Play();

    tweenCreate.Completed.Connect(() => {
        render.Destroy(); // I don't want to use ObjectPool, because it used in local
    })
}

function spawnHitboxRender(position: CFrame): void {
    const render = new Instance("Part");
    render.Name = "HitboxRender";
    render.Parent = Workspace; // local player spawn only for player
    render.Size = new Vector3(4, 10, 4)
    render.Anchored = true;
    render.CanCollide = false;
    render.Color = Color3.fromRGB(255, 0, 0);
    render.PivotTo(position);

    task.delay(3, () => {
        destroyHitboxRender(render); // instand start delete
    })
}


hitBoxRenderEvent.OnClientEvent.Connect((args) => {
    const renderParams = args as HitboxRender;

    if (renderParams.owner !== undefined) {
        spawnHitboxRender(renderParams.position);
    }
})

