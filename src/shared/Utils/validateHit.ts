import { Workspace } from "@rbxts/services";

// function getLocalRenders() {
//     const folder = Workspace.FindFirstChild("localRenders");
//     const voidFolder: Instance[] = [];
//     return folder?.GetChildren() ?? voidFolder;
// }

export function validateHit(player: Player, character: Model, liveState: boolean): [boolean, Model?] {

    if (liveState) {
        
        const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;
        const direction = (character.GetPivot().LookVector).mul(10);

        // const radius = 4;

        const raycastParams = new RaycastParams();
        raycastParams.FilterDescendantsInstances = [ character ];
        raycastParams.FilterType = Enum.RaycastFilterType.Exclude; // Exclude - Blacklist, Include - Whitelist

        const raycastResult = Workspace.Shapecast(
            humanoidRootPart,
            // radius, // in roblox-ts Shapecast don't take radius =[
            direction,
            raycastParams
        )

        if (raycastResult && raycastResult.Instance) {
            const hitPart = raycastResult.Instance;
            const hitOtherCharacter = hitPart.Parent as Model; // as model by have to chack has humanoid
            const humanoidOtherCharacter = hitOtherCharacter.FindFirstChildOfClass("Humanoid");
            if (
                // hitOtherCharacter !== character &&
                // hitOtherCharacter !== undefined && 
                humanoidOtherCharacter !== undefined
            ) { 
                print(`[Attack]: Hit detected`)
                return [true, hitOtherCharacter];
            }
        }

        return [false];
    }
    
    return [false];
}

/*
    use raycasting for other IF, validate, next time
*/