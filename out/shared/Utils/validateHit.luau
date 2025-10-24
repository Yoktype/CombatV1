-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local function validateHit(player, character, liveState)
	if liveState then
		local characterTorso = (character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso"))
		local direction = (character:GetPivot().LookVector) * 10
		-- const radius = 4;
		local raycastParams = RaycastParams.new()
		raycastParams.FilterDescendantsInstances = { character }
		raycastParams.FilterType = Enum.RaycastFilterType.Exclude
		local raycastResult = Workspace:Shapecast(characterTorso, direction, raycastParams)
		if raycastResult and raycastResult.Instance then
			local hitPart = raycastResult.Instance
			local hitOtherCharacter = hitPart.Parent
			local humanoidOtherCharacter = hitOtherCharacter:FindFirstChildOfClass("Humanoid")
			if humanoidOtherCharacter ~= nil then
				print(`[Attack]: Hit detected`)
				return { true, hitOtherCharacter }
			end
		end
		local _result = raycastResult
		if _result ~= nil then
			_result = _result.Instance
		end
		print(`[{_result}], ray result instance`)
		print(`[Attack]: No hit detected`)
		return { false }
	end
	print(`[{player.Name}]: Has died, can't attack`)
	return { false }
end
--[[
	
	    use raycasting for other IF, validate, next time
	
]]
return {
	validateHit = validateHit,
}
