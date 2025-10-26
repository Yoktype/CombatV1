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

function playAnimation(): void {
    const humanoid = getHumanoid();
    const animator = humanoid?.FindFirstChildOfClass("Animator") as Animator;
    if (dashAnimation) animator.LoadAnimation(dashAnimation);
}

function dash() {}

function dashBind(_: string, state: Enum.UserInputState, inputObject: InputObject) {
    // I want check first how to work a LenearVelocity by humanoidrootpart

    // here i will bind Q WHILE state = begin and unbind when state = false
    ContextActionService.BindAction("Dash", dash, false, Enum.KeyCode.Q)

    task.spawn(() => {
        while(state === Enum.UserInputState.Begin) { // if not work, use UserInputService.IsKeyDown(Enum.KeyCode.LeftShift)
            print(`[Dash]: has bind`)
        }
        // while state change player has unbind
        // how to work state :P
        ContextActionService.UnbindAction("Dash")
    })

}


ContextActionService.BindAction("dashBind", dashBind, true, Enum.KeyCode.LeftShift);
// create button on phone