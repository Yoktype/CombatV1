-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local ProfileStore = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "profile-store", "src")
local DATASTORE_NAME = "test"
local PLAYER_PROFILE = {
	cash = 0,
}
local PlayerStore = ProfileStore.New(DATASTORE_NAME, PLAYER_PROFILE)
local Profiles = {}
local function startChangeData(player)
end
local function giveData(player)
end
local function loadData(player)
	local key = `user_` .. `{player.UserId}`
	local profile = PlayerStore:StartSessionAsync(key, {
		Cancel = function()
			return player.Parent ~= Players
		end,
	})
	if profile ~= nil then
		profile:AddUserId(player.UserId)
		profile:Reconcile()
		profile.OnSessionEnd:Connect(function()
			local _player = player
			Profiles[_player] = nil
			player:Kick("Profile session end - Please rejoin")
		end)
		if player.Parent == Players then
			local _player = player
			Profiles[_player] = profile
		else
			profile:EndSession()
		end
	else
		player:Kick()
	end
end
local function createLeaderstats(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	local kills = Instance.new("IntValue")
	kills.Name = "Kills"
	kills.Value = 0
	leaderstats.Parent = player
	kills.Parent = leaderstats
end
Players.PlayerAdded:Connect(function(player)
	createLeaderstats(player)
	loadData(player)
end)
Players.PlayerRemoving:Connect(function(player)
	local _player = player
	local profile = Profiles[_player]
	if profile ~= nil then
		profile:EndSession()
	end
end)
return nil
