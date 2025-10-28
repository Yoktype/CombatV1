-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ContextActionService = _services.ContextActionService
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local UserInputService = _services.UserInputService
local config = TS.import(script, game:GetService("ReplicatedStorage"), "Utils", "Dash", "config")
local Events = ReplicatedStorage:FindFirstChild("Events")
local dashEvent = Events:FindFirstChild("DashEvent")
local _result = ReplicatedStorage:FindFirstChild("Assets")
if _result ~= nil then
	_result = _result:FindFirstChild("Animations")
end
local Animations = _result
local dashAnimation = Animations:FindFirstChild("Dash")
local LOCAL_PLAYER = Players.LocalPlayer
if not LOCAL_PLAYER then
	error("LOCAL_PLAYER got undefined")
end
-- const activityButtons = {
--     W: false,
--     A: false,
--     S: false,
--     D: false,
--     Q: false,
--     LeftShift: false
-- }
local function getCharacter()
	return LOCAL_PLAYER.Character or (LOCAL_PLAYER.CharacterAdded:Wait())
end
local function getHumanoid()
	local character = getCharacter()
	local _result_1 = character
	if _result_1 ~= nil then
		_result_1 = _result_1:FindFirstChildOfClass("Humanoid")
	end
	return _result_1
end
-- function getHumanoidRootPart(): BasePart | undefined {
--     const character = getCharacter();
--     return character?.FindFirstChild("HumanoidRootPart") as BasePart;
-- }
local function stopAnimation(animationTrack)
	if not animationTrack then
		return nil
	end
	animationTrack:Stop()
end
local function startAndGetAnimation()
	local humanoid = getHumanoid()
	local _result_1 = humanoid
	if _result_1 ~= nil then
		_result_1 = _result_1:FindFirstChildOfClass("Animator")
	end
	local animator = _result_1
	if not dashAnimation then
		return nil
	end
	local loadAnimation = animator:LoadAnimation(dashAnimation)
	loadAnimation:Play()
	task.wait(config.duration)
	stopAnimation(loadAnimation)
end
local function dash()
	local isDownW = UserInputService:IsKeyDown(Enum.KeyCode.W)
	local isDownA = UserInputService:IsKeyDown(Enum.KeyCode.A)
	local isDownS = UserInputService:IsKeyDown(Enum.KeyCode.S)
	local isDownD = UserInputService:IsKeyDown(Enum.KeyCode.D)
	if isDownW ~= false then
		dashEvent:FireServer("W")
		-- startAndGetAnimation();
		return nil
	end
	if isDownA ~= false then
		dashEvent:FireServer("A")
		-- startAndGetAnimation();
		return nil
	end
	if isDownS ~= false then
		dashEvent:FireServer("S")
		-- startAndGetAnimation();
		return nil
	end
	if isDownD ~= false then
		dashEvent:FireServer("D")
		-- startAndGetAnimation();
		return nil
	end
end
local function dashBind(_, state, inputObject)
	ContextActionService:BindAction("Dash", dash, false, Enum.KeyCode.Q)
	task.spawn(function()
		while UserInputService:IsKeyDown(Enum.KeyCode.LeftShift) do
			task.wait(.1)
			print(`wait`)
		end
		ContextActionService:UnbindAction("Dash")
	end)
end
ContextActionService:BindAction("dashBind", dashBind, true, Enum.KeyCode.LeftShift)
-- create button on phone
return nil
