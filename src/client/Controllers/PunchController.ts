import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";
import { validateHit } from "shared/Utils/validateHit";

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;

// maybe create module for constants, this is based constants
const LOCAL_PLAYER = Players.LocalPlayer as Player;
const CHARACTER = LOCAL_PLAYER.Character || LOCAL_PLAYER.CharacterAdded.Wait()[0] as Model;
const HUMANOID = CHARACTER.FindFirstChildOfClass("Humanoid") as Humanoid;
const ANIMATOR = HUMANOID.WaitForChild("Animator") as Animator || new Instance("Animator") as Animator;
ANIMATOR.Parent = HUMANOID;
const PUCH_ANIMATION = "rbxassetid://"; // unknowns id

let liveState: boolean = true;


function punch(): void {
// not worked w. random id =[
    // const animation = HUMANOID.FindFirstAncestorOfClass("Animation") || new Instance("Animation") as Animation;
    // animation.Parent = HUMANOID; // Create at local for player OMG
    // animation.AnimationId = PUCH_ANIMATION; // idk btw whats the animation here
    // ANIMATOR.LoadAnimation(animation)

    const [isHitValid, otherCharacter] = validateHit(LOCAL_PLAYER, CHARACTER, liveState);

    // type from declarated file: [fileName.d.ts]
    const validateHitParam: IValidateHit = {
        isHitValid: isHitValid,
        liveState: liveState,
        character: CHARACTER
    }

    punchEvent.FireServer(validateHitParam);
}


HUMANOID.Died.Connect(() => {
    liveState = false;
    task.wait(3);
    liveState = true;
})

UserInputService.InputBegan.Connect((input: InputObject, gameProcessedEvent: boolean) => {
    if (gameProcessedEvent) return;
    if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

    const stunnedState = CHARACTER.GetAttribute("StunnedState");
    if ( stunnedState === false ) {
        punch(); // if player not a stunned then attack
    } 
})


// event for activated punch() while player is in a dashing then we call punchw delay