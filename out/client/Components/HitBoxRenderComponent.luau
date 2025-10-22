-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ReplicatedStorage = _services.ReplicatedStorage
local TweenService = _services.TweenService
local Workspace = _services.Workspace
local Events = ReplicatedStorage:WaitForChild("Events")
local hitBoxRenderEvent = Events:WaitForChild("HitBoxRenderEvent")
local function destroyHitboxRender(render)
	local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, 0, false, 0)
	local propertyTable = {
		Transparency = 1,
	}
	local tweenCreate = TweenService:Create(render, tweenInfo, propertyTable)
	tweenCreate:Play()
	tweenCreate.Completed:Connect(function()
		render:Destroy()
	end)
end
local function spawnHitboxRender(position)
	local render = Instance.new("Part")
	render.Name = "HitboxRender"
	render.Parent = Workspace
	render.Size = Vector3.new(4, 10, 4)
	render.Anchored = true
	render.CanCollide = false
	render.Color = Color3.fromRGB(255, 0, 0)
	render:PivotTo(position)
	task.delay(3, function()
		destroyHitboxRender(render)
	end)
end
hitBoxRenderEvent.OnClientEvent:Connect(function(args)
	local renderParams = args
	if renderParams ~= nil then
		spawnHitboxRender(renderParams)
	end
end)
return nil
