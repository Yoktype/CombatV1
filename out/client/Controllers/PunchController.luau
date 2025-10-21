-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local UserInputService = _services.UserInputService
local validateHit = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Utils", "validateHit").validateHit
local Events = ReplicatedStorage:WaitForChild("Events")
local punchEvent = Events:WaitForChild("PunchEvent")
local LOCAL_PLAYER = Players.LocalPlayer
local CHARACTER = LOCAL_PLAYER.Character or (LOCAL_PLAYER.CharacterAdded:Wait())
local HUMANOID = CHARACTER:FindFirstAncestorOfClass("Humanoid")
local ANIMATOR = HUMANOID:FindFirstChildOfClass("Animator")
local PUCH_ANIMATION = "rbxassetid://13722448613"
-- WE NEED TEST THIS ANIMATION ID
local liveState = true
local function punch()
	-- activated animation punch here
	-- for don't start validate on server if false
	local _binding = validateHit(LOCAL_PLAYER, CHARACTER, liveState)
	local isHitValid = _binding[1]
	local otherCharacter = _binding[2]
	local validateHitParam = {
		isHitValid = isHitValid,
		liveState = liveState,
		character = CHARACTER,
	}
	punchEvent:FireServer(validateHitParam)
end
HUMANOID.Died:Connect(function()
	liveState = false
	task.wait(3)
	liveState = true
end)
UserInputService.InputBegan:Connect(function(input, gameProcessedEvent)
	if gameProcessedEvent then
		return nil
	end
	if input.UserInputType ~= Enum.UserInputType.MouseButton1 then
		return nil
	end
	local stunnedState = LOCAL_PLAYER:GetAttribute("StunnedState")
	print(`[{stunnedState}]: stunnedState on client`)
	if stunnedState == false then
		punch()
	end
end)
-- event for activated punch()
return nil
