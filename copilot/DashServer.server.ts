// Server Script (place in ServerScriptService)
// Applies the dash movement with server-side validation.
import { ReplicatedStorage, Players, Workspace } from "@rbxts/services";
import config from "shared/config";

// Ensure RemoteEvent exists (you can also create this in studio)
let dashEvent = ReplicatedStorage.FindFirstChild("DashEvent") as RemoteEvent | undefined;
if (!dashEvent) {
	dashEvent = new Instance("RemoteEvent");
	dashEvent.Name = "DashEvent";
	dashEvent.Parent = ReplicatedStorage;
}

const lastDash = new Map<number, number>(); // player.UserId -> last dash tick

dashEvent.OnServerEvent.Connect((player: Player, direction: Vector3, requestedSpeed: number, requestedDuration: number) => {
	// Basic validation
	if (!(direction instanceof Vector3) || typeof requestedSpeed !== "number" || typeof requestedDuration !== "number") return;

	// clamp values to reasonable limits
	const speed = math.clamp(requestedSpeed, 0, config.maxServerSpeed);
	const duration = math.clamp(requestedDuration, 0.01, config.maxDuration);

	const now = tick();
	const uid = player.UserId;
	const prev = lastDash.get(uid) ?? 0;
	if (now - prev < config.cooldown) return; // ignore: cooldown not finished
	
	lastDash.set(uid, now);

	// get character & root part
	const char = player.Character;
	const hrp = char?.FindFirstChild("HumanoidRootPart") as BasePart | undefined;
	if (!hrp) return;

	// sanitize direction and avoid NaN
	if (direction.Magnitude <= 0.001) return;
	const dir = new Vector3(direction.X, 0, direction.Z);
	if (dir.Magnitude <= 0.001) return;
	const unit = dir.Unit;

	// Apply dash by setting AssemblyLinearVelocity for a short duration, then restore (server authoritative).
	// Record previous assembly velocity so we can restore it after dash.
	const prevVel = hrp.AssemblyLinearVelocity;
	// Preserve vertical velocity
	const newVel = new Vector3(unit.X * speed, prevVel.Y, unit.Z * speed);

	// Set velocity
	hrp.AssemblyLinearVelocity = newVel;

	// Optionally set humanoid state to prevent jumping glitch
	const humanoid = char?.FindFirstChildOfClass("Humanoid");
	if (humanoid) {
		// temporarily set platform stand to avoid conflicting controls (optional)
		// humanoid.ChangeState(Enum.HumanoidStateType.Physics)
	}

	// After duration, restore previous velocity if it still seems safe
	task.delay(duration, () => {
		// if character still exists
		if (!player.Character) return;
		const current = hrp.AssemblyLinearVelocity;
		// Only restore if the current XZ velocity is roughly what we set (to avoid overwriting other movement)
		const setXZ = new Vector3(newVel.X, 0, newVel.Z);
		const curXZ = new Vector3(current.X, 0, current.Z);
		// If it's still close to our dash, restore; else leave alone
		if (setXZ.sub(curXZ).Magnitude < 10) {
			// restore horizontal components to previous or zero (choose a safe option)
			hrp.AssemblyLinearVelocity = new Vector3(prevVel.X, hrp.AssemblyLinearVelocity.Y, prevVel.Z);
		}
	});
});