import { ReplicatedStorage } from "@rbxts/services";


const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;







hitBoxRenderEvent.OnClientEvent.Connect(() => {})

