import { ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.FindFirstChild("Events") as Folder;
const dashEvent = Events.FindFirstChild("DashEvent") as RemoteEvent;


function getVelocity(): Vector3 {



    return new Vector3(0, 0, 0);
}






dashEvent.OnServerEvent.Connect((player: Player, args) => {
    

    
})