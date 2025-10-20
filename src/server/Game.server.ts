import { ServerScriptService, ReplicatedStorage } from "@rbxts/services";
import { validateHit } from "shared/Utils/validateHit";

const PlayerModule = require(ServerScriptService.FindFirstChild("Player") as ModuleScript);

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;


function notificationPlayers() {

    // TODO: FireAllClients Punch Visuals create uhmmm
    // Yeah we notify all players for create red-part render for visuals

    hitBoxRenderEvent.FireAllClients();

}

function handlePunch(player: Player, liveState: boolean, character: Model): void {


    const [isValidateHit, otherCharacter] = validateHit(player, character, liveState);
    if ( isValidateHit === true ) {

    }

}



punchEvent.OnServerEvent.Connect((player: Player, params) => {
    const validateHitParam = params as IValidateHit;
    if ( validateHitParam.isHitValid === true ) {

        handlePunch(player, validateHitParam.liveState, validateHitParam.character);

    } else { notificationPlayers(); } // if not valid hit then only visuals

})
