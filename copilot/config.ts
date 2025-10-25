// Shared config - place in a ModuleScript (ReplicatedStorage) or compile to be importable from both client and server
export = {
	animationId: "rbxassetid://PUT_YOUR_ANIMATION_ID_HERE", // optional if you store Animation instance in ReplicatedStorage
	dashSpeed: 120,         // studs/sec applied during dash
	dashDuration: 0.12,     // seconds
	cooldown: 1.0,          // seconds between dashes (server authoritative)
	maxServerSpeed: 200,    // server-side clamp
	maxDuration: 0.5,       // server-side clamp
};