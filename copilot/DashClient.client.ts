// LocalScript (compile to StarterPlayerScripts). Detects input, plays animation, and asks server to dash.
import { Players, ReplicatedStorage, UserInputService, RunService, ContextActionService, StarterPlayer, Workspace } from "@rbxts/services";
import config from "./config";

const player = Players.LocalPlayer;
if (!player) throw "DashClient must run on the client";

const dashEvent = ReplicatedStorage.WaitForChild("DashEvent") as RemoteEvent;

// Optional: store last local dash time for client cooldown UI/feel
let lastLocalDash = 0;
const localCooldown = config.cooldown;

function getCharacter(): Model | undefined {
	return player.Character ?? player.CharacterAdded.Wait()[0];
}

function getHumanoid(): Humanoid | undefined {
	const char = getCharacter();
	return char?.FindFirstChildOfClass("Humanoid");
}

function getRoot(): BasePart | undefined {
	const char = getCharacter();
	return char?.FindFirstChild("HumanoidRootPart") as BasePart | undefined;
}

// Determine dash direction
function getDashDirection(): Vector3 {
	const char = getCharacter();
	const hrp = getRoot();
	const humanoid = getHumanoid();
	const camera = Workspace.CurrentCamera;
	if (!hrp || !camera) return new Vector3(0, 0, 0);

	// Prefer move direction (WASD / controller). If not moving, dash forward in camera direction.
	const moveDir = humanoid?.MoveDirection ?? new Vector3(0, 0, 0);
	if (moveDir.Magnitude > 0.1) {
		const flat = new Vector3(moveDir.X, 0, moveDir.Z);
		return flat.Unit;
	}

	// fallback to camera forward on XZ plane
	const look = camera.CFrame.LookVector;
	return new Vector3(look.X, 0, look.Z).Unit;
}

// Play dash animation locally (non-authoritative)
function playDashAnimation(): AnimationTrack | undefined {
	const humanoid = getHumanoid();
	if (!humanoid) return;

	// If you've put an Animation in ReplicatedStorage named "DashAnimation", you can use that instead.
	// Here we use a config.animationId. Replace with your animation asset ID.
	const anim = new Instance("Animation");
	anim.AnimationId = config.animationId;

	const track = humanoid.LoadAnimation(anim); // need to use animtor btw
	track.Play();
	// clean up animation instance so it's not left in heap (track keeps the animation)
	task.delay(2, () => {
		anim.Destroy(); // destroy every times and create new
	});
	return track;
}

// Input binding: LeftShift for dash (you can change to double-tap detection or a button)
UserInputService.InputBegan.Connect((input, gameProcessed) => {
	if (gameProcessed) return;
	// dash on LeftShift
	if (input.KeyCode === Enum.KeyCode.LeftShift) {
		const now = tick();
		if (now - lastLocalDash < localCooldown) return; // local cooldown (UX), server enforces real cooldown
		lastLocalDash = now;

		const dir = getDashDirection();
		if (dir.Magnitude <= 0.01) return;

		// play local animation
		playDashAnimation();

		// Fire server to perform the authoritative dash.
		// We send direction and client-predicted speed; server will validate & clamp.
		dashEvent.FireServer(dir, config.dashSpeed, config.dashDuration);
                            // направление скорость длительность
	}
});
