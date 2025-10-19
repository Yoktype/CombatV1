import { ServerScriptService, ReplicatedStorage } from "@rbxts/services";

const PlayerModule = require(ServerScriptService.FindFirstChild("Player") as ModuleScript);

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;


function notificationPlayers() {

    // TODO: FireAllClients Punch Visuals create uhmmm
    // Yeah we notify all players for create red-part render for visuals

}

function handlePunch(player: Player) {

    // TODO: validate punch use raycasts and zone???

}



punchEvent.OnServerEvent.Connect((player: Player, params) => {

    if ( params === true ) {

    } else { notificationPlayers(); } // if not valid hit then only visuals

})
