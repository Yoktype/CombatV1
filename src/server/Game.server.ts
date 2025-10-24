import { ServerScriptService, ReplicatedStorage, Players } from "@rbxts/services";
import { validateHit } from "shared/Utils/validateHit";

const PlayerModule = require(ServerScriptService.FindFirstChild("Player") as ModuleScript);

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;
const hitBoxRenderEvent = Events.WaitForChild("HitBoxRenderEvent") as RemoteEvent;

const STUN_TIME = 1.5;
const ATTACK_RANGE = 5;


function getPossitionRender(character: Model): CFrame | undefined {
    const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;
    if (humanoidRootPart !== undefined) {

        const pivot = humanoidRootPart.GetPivot();
        const lookVector = pivot.LookVector;
        const torsoPosition: Vector3 = humanoidRootPart.GetPivot().Position;

        const newPosition = torsoPosition.add(lookVector.mul(ATTACK_RANGE));
        const cfRender = CFrame.lookAt(newPosition, newPosition.add(lookVector));

        return cfRender; // recheck this 
    }

    return undefined
}

function notificationPlayers(character: Model) {
    const renderPosition = getPossitionRender(character) || new CFrame();
    if (renderPosition !== undefined) hitBoxRenderEvent.FireAllClients(renderPosition);
}

function tryDamageOtherPlayer(player: Player, liveState: boolean, character: Model): void {
    const [isValidateHit, otherCharacter] = validateHit(player, character, liveState);
    if ( isValidateHit === true && otherCharacter !== undefined ) {
        const humanoid = otherCharacter.FindFirstChildOfClass("Humanoid") as Humanoid;
        // const otherPlayer = Players.GetPlayerFromCharacter(otherCharacter) as Player;
        
        // save character params
        const walkSpeed = humanoid.WalkSpeed;
        const jumpPower = humanoid.JumpPower;
        
        // stun
        humanoid.WalkSpeed = 0;
        humanoid.JumpPower = 0;
        otherCharacter.SetAttribute("StunnedState", true);
        
        task.delay(STUN_TIME, () => {
            // give back all
            humanoid.WalkSpeed = walkSpeed;
            humanoid.JumpPower = jumpPower;
            otherCharacter.SetAttribute("StunnedState", false);
        })
        
        humanoid.TakeDamage(10);
        const health = math.max(humanoid.Health, 0);
        if ( health <= 0 ) {
            // player, get point at "kills" of leaderstats
            // change or create function in playerData where i will send 1 and it change value
        }

        print(`[Attack]: true`);
        return
    }

    print(`[Attack]: not validate`);
    return;
}

function setupNewPlayer(player: Player, character: Model) {

    character.SetAttribute("StunnedState", false);
    print(`StunnedState initialize for [${player.Name}]`);

    // here need gets value for player-damage, class(maybe i create ability and ultimate)
    // from profile 
}


// Setup new player
Players.PlayerAdded.Connect(player => {
    player.CharacterAdded.Connect(character => {
        setupNewPlayer(player, character);
    })
})

punchEvent.OnServerEvent.Connect((player: Player, params) => {
    const validateHitParam = params as IValidateHit; // from d.ts

    print(validateHitParam);
    if ( validateHitParam.isHitValid === true ) {

        print(`Validate === true damnnnnnnnnnn`)

        tryDamageOtherPlayer(player, validateHitParam.liveState, validateHitParam.character);
        notificationPlayers(validateHitParam.character);

    } else { notificationPlayers(validateHitParam.character); } // BTW IF PLAYER NOT ALIVE THEN IT WILL WORK I DON't CHECK LIVESTATE
})
