-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local function validateHit(player, character, liveState)
	if liveState then
		local characterTorso = (character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso"))
		local direction = (character:GetPivot().LookVector) * 10
		local raycastParams = RaycastParams.new()
		raycastParams.FilterDescendantsInstances = { character }
		raycastParams.FilterType = Enum.RaycastFilterType.Include
		local raycastResult = Workspace:Shapecast(characterTorso, direction, raycastParams)
		if raycastResult and raycastResult.Instance then
			local hitPart = raycastResult.Instance
			local hitOtherCharacter = hitPart.Parent
			local _humanoidOtherCharacter = hitOtherCharacter
			if _humanoidOtherCharacter ~= nil then
				_humanoidOtherCharacter = _humanoidOtherCharacter:FindFirstChildOfClass("Humanoid")
			end
			local humanoidOtherCharacter = _humanoidOtherCharacter
			if hitOtherCharacter ~= character and hitOtherCharacter ~= nil and humanoidOtherCharacter ~= nil then
				print(`[Attack]: Hit detected`)
				return { true, hitOtherCharacter }
			end
		end
		print(`[Attack]: No hit detected`)
		return { false }
	end
	print(`[{player.Name}]: Has died, can't attack`)
	return { false }
end
return {
	validateHit = validateHit,
}
