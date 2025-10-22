-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local intialize = TS.import(script, game:GetService("ReplicatedStorage"), "Utils", "initialize").intialize
local LOCAL_PLAYER = Players.LocalPlayer
local _result = script.Parent
if _result ~= nil then
	_result = _result:FindFirstChild("Components")
end
local components = _result
local _result_1 = script.Parent
if _result_1 ~= nil then
	_result_1 = _result_1:FindFirstChild("Controllers")
end
local controllers = _result_1
intialize(components)
intialize(controllers)
