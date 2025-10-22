-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ServerScriptService = _services.ServerScriptService
local ReplicatedStorage = _services.ReplicatedStorage
local Players = _services.Players
local validateHit = TS.import(script, game:GetService("ReplicatedStorage"), "Utils", "validateHit").validateHit
local PlayerModule = require(ServerScriptService:FindFirstChild("Player"))
local Events = ReplicatedStorage:WaitForChild("Events")
local punchEvent = Events:WaitForChild("PunchEvent")
local hitBoxRenderEvent = Events:WaitForChild("HitBoxRenderEvent")
local ATTACK_RANGE = 5
local function getPossitionRender(character)
	local torso = (character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso"))
	if torso ~= nil then
		local pivot = torso:GetPivot()
		local lookVector = pivot.LookVector
		local torsoPosition = torso:GetPivot().Position
		local _arg0 = lookVector * ATTACK_RANGE
		local newPosition = torsoPosition + _arg0
		local cfRender = CFrame.lookAt(newPosition, newPosition + lookVector)
		return cfRender
	end
	return nil
end
local function notificationPlayers(character)
	local renderPosition = getPossitionRender(character) or CFrame.new()
	if renderPosition ~= nil then
		hitBoxRenderEvent:FireAllClients(renderPosition)
	end
end
local function tryDamageOtherPlayer(player, liveState, character)
	local _binding = validateHit(player, character, liveState)
	local isValidateHit = _binding[1]
	local otherCharacter = _binding[2]
	if isValidateHit == true and otherCharacter ~= nil then
		local humanoid = otherCharacter:FindFirstAncestorOfClass("Humanoid")
		humanoid:TakeDamage(10)
		local otherPlayer = Players:GetPlayerFromCharacter(otherCharacter)
		local _result = otherPlayer
		if _result ~= nil then
			_result:SetAttribute("StunnedState", true)
		end
		task.delay(2.7, function()
			local _result_1 = otherPlayer
			if _result_1 ~= nil then
				_result_1:SetAttribute("StunnedState", false)
			end
		end)
		local health = math.max(humanoid.Health, 0)
		if health <= 0 then
			-- player, get point at "kills" of leaderstats
			-- change or create function in playerData where i will send 1 and it change value
		end
		return nil
	end
	print(`error if checking`)
	return nil
end
local function setupNewPlayer(player)
	if player.Parent == Players then
		player:SetAttribute("StunnedState", false)
		print(`StunnedState initialize for [{player.Name}]`)
		-- here need gets value for player-damage, class(maybe i create ability and ultimate)
		-- from profile 
	end
end
Players.PlayerAdded:Connect(function(player)
	-- Setup new player
	setupNewPlayer(player)
end)
punchEvent.OnServerEvent:Connect(function(player, params)
	local validateHitParam = params
	if validateHitParam.isHitValid == true then
		tryDamageOtherPlayer(player, validateHitParam.liveState, validateHitParam.character)
	else
		notificationPlayers(validateHitParam.character)
	end
end)
