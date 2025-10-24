import { ContextActionService, UserInputService } from "@rbxts/services";


function dash(actionName: string, state: Enum.UserInputState, inputObject: InputObject): void {
    
    const isPressedW = UserInputService.IsKeyDown(Enum.KeyCode.W);
    const isPressedA = UserInputService.IsKeyDown(Enum.KeyCode.A);
    const isPressedD = UserInputService.IsKeyDown(Enum.KeyCode.D);

    if (isPressedW === true) return;
    // idk how to make dash =]
    if (isPressedA === true || isPressedD === true) return; 

}

function dashBind(actionName: string, state: Enum.UserInputState, inputObject: InputObject) {

    ContextActionService.BindAction("Dash", dash, true, Enum.KeyCode.Q); // bind once bruh

    task.spawn(() => {
        while (UserInputService.IsKeyDown(Enum.KeyCode.LeftShift) === true) {
            print(`LeftShift begining`)
        }
        print(`[Action Dash]: has Unbind, because LeftShift end begining`)
        ContextActionService.UnbindAction("Dash");
    })
}


ContextActionService.BindAction("DashBinding", dashBind, true, Enum.KeyCode.LeftShift);


// while begining LeftShift then i can use Q for dash, and i check dash type DirectDash or NormalDash