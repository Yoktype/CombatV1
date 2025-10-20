import { ServerScriptService, ReplicatedStorage, Players } from "@rbxts/services";
import { validateHit } from "shared/Utils/validateHit";

const PlayerModule = require(ServerScriptService.FindFirstChild("Player") as ModuleScript);

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;


function notificationPlayers() {

    // TODO: FireAllClients Punch Visuals create uhmmm
    // Yeah we notify all players for create red-part render for visuals

    // ??? Visuals 

    hitBoxRenderEvent.FireAllClients();
    // Create red part on hit location for all players
    // vector3 or Cframe hmm pos and rotation or pivot

}

function tryDamageOtherPlayer(player: Player, liveState: boolean, character: Model): void {


    const [isValidateHit, otherCharacter] = validateHit(player, character, liveState);
    if ( isValidateHit === true ) {

        // where i can get player damage value?
        // other player take stun and damage
        // stun - no walk and change Attribbute for sometimes
        // need init to setup Attribute for new Player or add r here but
        // first punch has stun Attribute undefined

    }

}

function setupNewPlayer(player: Player) {
    if (player.Parent === Players) { // once ummmmm we need maybe wait player

        // Create Stun Attribute for player

    }
}


Players.PlayerAdded.Connect(player => {
    // Setup new player
    setupNewPlayer(player);
})

punchEvent.OnServerEvent.Connect((player: Player, params) => {
    const validateHitParam = params as IValidateHit; // from d.ts
    if ( validateHitParam.isHitValid === true ) {

        tryDamageOtherPlayer(player, validateHitParam.liveState, validateHitParam.character);

    } else { notificationPlayers(); } // if not valid hit then only visuals
    // Yeah alr i can do it, we have a validateHitParam.character for visuals 
})
