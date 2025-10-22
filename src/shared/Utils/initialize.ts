interface InitModule {
    onStart: () => {}
}

export function intialize(folder: Folder): void {
    for (const [idx, Vmodule] of pairs(folder.GetChildren())) {
        const module = Vmodule as ModuleScript;
        if (module.IsA("ModuleScript")) {
            const reqModule = require(module) as InitModule;

            // if (reqModule.onStart !== undefined) {
            //     reqModule.onStart();
            // }
        }
    }
}