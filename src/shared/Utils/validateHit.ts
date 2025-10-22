import { Workspace } from "@rbxts/services";


export function validateHit(player: Player, character: Model, liveState: boolean): [boolean, Model?] {

    if (liveState) {
        
        const characterTorso = (character.FindFirstChild("UpperTorso") || character.FindFirstChild("Torso")) as BasePart;
        const direction = (character.GetPivot().LookVector).mul(10);

        const raycastParams = new RaycastParams();
        raycastParams.FilterDescendantsInstances = [character];
        raycastParams.FilterType = Enum.RaycastFilterType.Include; // Maybe need to be Exclude

        const raycastResult = Workspace.Shapecast(
            characterTorso,
            direction,
            raycastParams
        )

        if (raycastResult && raycastResult.Instance) {
            const hitPart = raycastResult.Instance;
            const hitOtherCharacter = hitPart.Parent as Model; // as model by have to chack has humanoid
            const humanoidOtherCharacter = hitOtherCharacter?.FindFirstChildOfClass("Humanoid");
            if (
                hitOtherCharacter !== character &&
                hitOtherCharacter !== undefined && 
                humanoidOtherCharacter !== undefined
            ) { 
                print(`[Attack]: Hit detected`)
                return [true, hitOtherCharacter];
            }
        }
        print(`[Attack]: No hit detected`);
        return [false];
    }
    print(`[${player.Name}]: Has died, can't attack`);
    return [false];
}