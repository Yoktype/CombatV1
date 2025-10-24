-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local UserInputService = _services.UserInputService
local validateHit = TS.import(script, game:GetService("ReplicatedStorage"), "Utils", "validateHit").validateHit
local Events = ReplicatedStorage:WaitForChild("Events")
local punchEvent = Events:WaitForChild("PunchEvent")
-- maybe create module for constants, this is based constants
local LOCAL_PLAYER = Players.LocalPlayer
local CHARACTER = LOCAL_PLAYER.Character or (LOCAL_PLAYER.CharacterAdded:Wait())
local HUMANOID = CHARACTER:FindFirstChildOfClass("Humanoid")
local ANIMATOR = HUMANOID:WaitForChild("Animator") or Instance.new("Animator")
ANIMATOR.Parent = HUMANOID
local PUCH_ANIMATION = "rbxassetid://"
local liveState = true
local function punch()
	-- not worked w. random id =[
	-- const animation = HUMANOID.FindFirstAncestorOfClass("Animation") || new Instance("Animation") as Animation;
	-- animation.Parent = HUMANOID; // Create at local for player OMG
	-- animation.AnimationId = PUCH_ANIMATION; // idk btw whats the animation here
	-- ANIMATOR.LoadAnimation(animation)
	local _binding = validateHit(LOCAL_PLAYER, CHARACTER, liveState)
	local isHitValid = _binding[1]
	local otherCharacter = _binding[2]
	-- type from declarated file: [fileName.d.ts]
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
	local stunnedState = CHARACTER:GetAttribute("StunnedState")
	print(`[{stunnedState}]: stunnedState on client`)
	if stunnedState == false then
		punch()
	end
end)
-- event for activated punch() while player is in a dashing then we call punchw delay
return nil
