import { ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.FindFirstChild("Events") as Folder;
const dashEvent = Events.FindFirstChild("DashEvent") as RemoteEvent;

dashEvent.OnServerEvent.Connect((player: Player, args) => {
    

    
})