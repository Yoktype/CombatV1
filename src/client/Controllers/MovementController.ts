import { ContextActionService } from "@rbxts/services";


function directDash() {
    print(`do direct dash`);
}


function defaultDash() {
    print(`do dash =]`);
}


ContextActionService.BindAction("Dash", defaultDash, true, Enum.KeyCode.Q);
ContextActionService.BindAction("DirectDash", directDash, true, Enum.KeyCode.LeftShift);

// okay idk how to use CAS how i can look while beigning shift and my keycode
// and whats params in my function