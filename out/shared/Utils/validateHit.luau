-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
-- function getLocalRenders() {
--     const folder = Workspace.FindFirstChild("localRenders");
--     const voidFolder: Instance[] = [];
--     return folder?.GetChildren() ?? voidFolder;
-- }
local function validateHit(player, character, liveState)
	if liveState then
		local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
		local direction = (character:GetPivot().LookVector) * 10
		-- const radius = 4;
		local raycastParams = RaycastParams.new()
		raycastParams.FilterDescendantsInstances = { character }
		raycastParams.FilterType = Enum.RaycastFilterType.Exclude
		local raycastResult = Workspace:Shapecast(humanoidRootPart, direction, raycastParams)
		if raycastResult and raycastResult.Instance then
			local hitPart = raycastResult.Instance
			local hitOtherCharacter = hitPart.Parent
			local humanoidOtherCharacter = hitOtherCharacter:FindFirstChildOfClass("Humanoid")
			if humanoidOtherCharacter ~= nil then
				print(`[Attack]: Hit detected`)
				return { true, hitOtherCharacter }
			end
		end
		return { false }
	end
	return { false }
end
--[[
	
	    use raycasting for other IF, validate, next time
	
]]
return {
	validateHit = validateHit,
}
