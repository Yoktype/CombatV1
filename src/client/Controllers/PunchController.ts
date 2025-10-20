import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";
import { validateHit } from "shared/Utils/validateHit";

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;

const LOCAL_PLAYER = Players.LocalPlayer as Player;
const CHARACTER = LOCAL_PLAYER.Character || LOCAL_PLAYER.CharacterAdded.Wait()[0] as Model;
const HUMANOID = CHARACTER.FindFirstAncestorOfClass("Humanoid") as Humanoid;

let liveState: boolean = true;


function punch() {
    // for don't start validate on server
    const [isHitValid, otherCharacter] = validateHit(LOCAL_PLAYER, CHARACTER, liveState);

    const validateHitParam: IValidateHit = { // declared in d.ts
        isHitValid: isHitValid,
        liveState: liveState,
        character: CHARACTER
    }

    punchEvent.FireServer(validateHitParam); // player in param auto
}


HUMANOID.Died.Connect(() => {
    liveState = false;
    task.wait(3);
    liveState = true;
})

UserInputService.InputBegan.Connect((input: InputObject, gameProcessedEvent: boolean) => {
    if (gameProcessedEvent) return;
    if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

    punch();
})

