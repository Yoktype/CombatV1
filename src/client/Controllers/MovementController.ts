import { ContextActionService, Players, ReplicatedStorage, UserInputService } from "@rbxts/services";
import config from "shared/Utils/Dash/config";

const Events = ReplicatedStorage.FindFirstChild("Events") as Folder;
const dashEvent = Events.FindFirstChild("DashEvent") as RemoteEvent;

const Animations = ReplicatedStorage.FindFirstChild("Assets")?.FindFirstChild("Animations") as Folder;
const dashAnimation = Animations.FindFirstChild("Dash") as Animation;

const LOCAL_PLAYER = Players.LocalPlayer;
if (!LOCAL_PLAYER) throw"LOCAL_PLAYER got undefined";

// const activityButtons = {
//     W: false,
//     A: false,
//     S: false,
//     D: false,
//     Q: false,
//     LeftShift: false
// }


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

function getDirection(button: string): Vector3 {
    const character = getCharacter();
    const humanoid = getHumanoid();
    const humanoidRootPart = getHumanoidRootPart();

    if (character && humanoidRootPart) {

        // maybe use a humanoid MoveDirection
        // nah i will use IsKeyDown and use switch case case case
        // or will use  Map.find(KeyCode) - where KeyCode the key and function return or do



        // HERE i check ISKEY DOWN AND use a switch



        return new Vector3(0, 0, 0);
    }

    return new Vector3(0, 0, 0);
}

function stopAnimation(animationTrack: AnimationTrack): void {
    if (!animationTrack) return;
    animationTrack.Stop();
}

function startAndGetAnimation(): AnimationTrack | undefined {
    const humanoid = getHumanoid();
    const animator = humanoid?.FindFirstChildOfClass("Animator") as Animator;
    if (!dashAnimation) return

    const loadAnimation = animator.LoadAnimation(dashAnimation);
    loadAnimation.Play();

    task.wait(config.duration);

    stopAnimation(loadAnimation);

    return loadAnimation
}

function dash(): void {
    const isDownW = UserInputService.IsKeyDown(Enum.KeyCode.W);
    const isDownA = UserInputService.IsKeyDown(Enum.KeyCode.A);
    const isDownS = UserInputService.IsKeyDown(Enum.KeyCode.S);
    const isDownD = UserInputService.IsKeyDown(Enum.KeyCode.D);

    if (isDownW !== false) { 
        dashEvent.FireServer("W");
        return;
    }
    if (isDownA !== false) {
        dashEvent.FireServer("A");
        return;
    }
    if (isDownS !== false) {
        dashEvent.FireServer("S");
        return;
    }
    if (isDownD !== false) {
        dashEvent.FireServer("D");
        return;
    }
}

function dashBind(_: string, state: Enum.UserInputState, inputObject: InputObject) {
    ContextActionService.BindAction("Dash", dash, false, Enum.KeyCode.Q)

    task.spawn(() => {
        while(state === Enum.UserInputState.Begin) { // if not work, use UserInputService.IsKeyDown(Enum.KeyCode.LeftShift)
            print(`[Dash]: has bind`)
        }
        ContextActionService.UnbindAction("Dash")
    })

}


ContextActionService.BindAction("dashBind", dashBind, true, Enum.KeyCode.LeftShift);
// create button on phone