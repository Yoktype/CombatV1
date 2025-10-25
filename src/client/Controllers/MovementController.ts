import { ContextActionService, Players, ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.FindFirstChild("Events") as Folder;
const dashEvent = Events.FindFirstChild("DashEvent") as RemoteEvent;

const Animations = ReplicatedStorage.FindFirstChild("Assets")?.FindFirstChild("Animations") as Folder;
const dashAnimation = Animations.FindFirstChild("Dash") as Animation;

const LOCAL_PLAYER = Players.LocalPlayer;
if (!LOCAL_PLAYER) throw"LOCAL_PLAYER got undefined";

const activityButtons = {
    W: false,
    A: false,
    S: false,
    D: false,
    Q: false,
    LeftShift: false
}


function getCharacter(): Model | undefined {
    return LOCAL_PLAYER.Character ?? LOCAL_PLAYER.CharacterAdded.Wait()[0];
}

function getHumanoid(): Humanoid | undefined {
    const character = getCharacter();
    return character?.FindFirstChildOfClass("Humanoid");
}

function getHumanoidRootPart(): BasePart | undefined {
    const character = getCharacter();
    return character?.FindFirstChild("HumanoidRootPart") as BasePart;
}

function getDirection(): Vector3 {

    return new Vector3(0, 0, 0);
}

function playAnimation(): void {
    const humanoid = getHumanoid();
    const animator = humanoid?.FindFirstChildOfClass("Animator") as Animator;

    if (dashAnimation) animator.LoadAnimation(dashAnimation);

}


function dash(_: string, state: Enum.UserInputState, inputObject: InputObject) {
    // I want check first how to work a LenearVelocity by humanoidrootpart


}


ContextActionService.BindAction("Dash", dash, true, Enum.KeyCode.LeftShift);
// create button on phone