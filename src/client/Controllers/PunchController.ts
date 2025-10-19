import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const punchEvent = Events.WaitForChild("PunchEvent") as RemoteEvent;

const LOCAL_PLAYER = Players.LocalPlayer as Player;
const CHARACTER = LOCAL_PLAYER.Character || LOCAL_PLAYER.CharacterAdded.Wait()[0] as Model;
const HUMANOID = CHARACTER.FindFirstAncestorOfClass("Humanoid") as Humanoid;

let liveState: boolean = true;

function validateHit(): boolean {

    if (liveState) {
        
        const characterTorso = (CHARACTER.FindFirstChild("UpperTorso") || CHARACTER.FindFirstChild("Torso")) as BasePart;
        const direction = (CHARACTER.GetPivot().LookVector).mul(10);

        const raycastParams = new RaycastParams();
        raycastParams.FilterDescendantsInstances = [CHARACTER];
        raycastParams.FilterType = Enum.RaycastFilterType.Include; // MAYBE ENCLUDE idk

        const raycastResult = Workspace.Shapecast(
            characterTorso,
            direction,
            raycastParams
        )

        if (raycastResult && raycastResult.Instance) {
            const hitPart = raycastResult.Instance;
            const hitCharacter = hitPart.FindFirstAncestorOfClass("Model");

            if (hitCharacter) {
                return true;
            }
        }

        return false;
    }
    
    return false;
}

function punch() {
    const isHitValid = validateHit();

    punchEvent.FireServer(isHitValid); // player in param auto
}


HUMANOID.Died.Connect(() => {
    liveState = false;
    task.wait(3);
    liveState = true;
})

UserInputService.InputBegan.Connect((input: InputObject, gameProcessedEvent: boolean) => {
    if (gameProcessedEvent) return;
    if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;


})

