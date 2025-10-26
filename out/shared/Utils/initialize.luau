-- Compiled with roblox-ts v3.0.0
-- interface InitModule {
--     onStart: () => {}
-- }
local function intialize(folder)
	for idx, Vmodule in pairs(folder:GetChildren()) do
		local module = Vmodule
		if module:IsA("ModuleScript") then
			local reqModule = require(module)
			-- if (reqModule.onStart !== undefined) {
			--     reqModule.onStart();
			-- }
		end
	end
end
return {
	intialize = intialize,
}
