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

// function getHumanoidRootPart(): BasePart | undefined {
//     const character = getCharacter();
//     return character?.FindFirstChild("HumanoidRootPart") as BasePart;
// }

function stopAnimation(animationTrack: AnimationTrack): void {
    if (!animationTrack) return;
    animationTrack.Stop();
}

function startAndGetAnimation() {
    const humanoid = getHumanoid();
    const animator = humanoid?.FindFirstChildOfClass("Animator") as Animator;
    if (!dashAnimation) return; // if not need create new and set AnimationId

    const loadAnimation = animator.LoadAnimation(dashAnimation);
    loadAnimation.Play();

    task.wait(config.duration);

    stopAnimation(loadAnimation);
}

function dash(): void {
    const isDownW = UserInputService.IsKeyDown(Enum.KeyCode.W);
    const isDownA = UserInputService.IsKeyDown(Enum.KeyCode.A);
    const isDownS = UserInputService.IsKeyDown(Enum.KeyCode.S);
    const isDownD = UserInputService.IsKeyDown(Enum.KeyCode.D);

    if (isDownW !== false) { 
        dashEvent.FireServer("W");
        // startAndGetAnimation();
        return;
    }
    if (isDownA !== false) {
        dashEvent.FireServer("A");
        // startAndGetAnimation();
        return;
    }
    if (isDownS !== false) {
        dashEvent.FireServer("S");
        // startAndGetAnimation();
        return;
    }
    if (isDownD !== false) {
        dashEvent.FireServer("D");
        // startAndGetAnimation();
        return;
    }
}

function dashBind(_: string, state: Enum.UserInputState, inputObject: InputObject) {
    ContextActionService.BindAction("Dash", dash, false, Enum.KeyCode.Q)

    task.spawn(() => {
        while(UserInputService.IsKeyDown(Enum.KeyCode.LeftShift)) { // if not work, use UserInputService.IsKeyDown(Enum.KeyCode.LeftShift)
            task.wait(.1);
            print(`wait`);
        }
        ContextActionService.UnbindAction("Dash")
    })

}


ContextActionService.BindAction("dashBind", dashBind, true, Enum.KeyCode.LeftShift);
// create button on phone