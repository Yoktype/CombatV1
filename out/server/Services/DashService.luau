-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local config = TS.import(script, game:GetService("ReplicatedStorage"), "Utils", "Dash", "config")
local Events = ReplicatedStorage:FindFirstChild("Events")
local dashEvent = Events:FindFirstChild("DashEvent")
local directions = {}
local _vector3 = Vector3.new(0, 0, -1)
directions.W = _vector3
local _vector3_1 = Vector3.new(-1, 0, 0)
directions.A = _vector3_1
local _vector3_2 = Vector3.new(0, 0, 1)
directions.S = _vector3_2
local _vector3_3 = Vector3.new(1, 0, 0)
directions.D = _vector3_3
local playersCooldowns = {}
local function dash(player, direction)
	local dashDuration = config.duration
	local velocity = config.velocity
	local dashVelocity = direction * velocity
	local character = player.Character or (player.CharacterAdded:Wait())
	local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
	humanoidRootPart:SetNetworkOwner(nil)
	local startVelocity = humanoidRootPart.AssemblyLinearVelocity
	humanoidRootPart.AssemblyLinearVelocity = dashVelocity
	-- ???????? why i cant change
	print(humanoidRootPart.AssemblyLinearVelocity)
	task.wait(dashDuration)
	humanoidRootPart.AssemblyLinearVelocity = startVelocity
	humanoidRootPart:SetNetworkOwner(player)
end
dashEvent.OnServerEvent:Connect(function(player, args)
	print(args)
	local param = args
	if args == nil then
		return nil
	end
	local time = os.time()
	local _player = player
	local cooldown = playersCooldowns[_player] ~= nil
	if cooldown == false then
		local _player_1 = player
		playersCooldowns[_player_1] = 0
	else
		local _player_1 = player
		local playerCooldown = playersCooldowns[_player_1]
		local lastDash = time - playerCooldown
		if lastDash < config.cooldown then
			return nil
		end
		local _player_2 = player
		playersCooldowns[_player_2] = time
	end
	local dir = directions[param]
	dash(player, dir)
end)
return nil
