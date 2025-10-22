interface InitModule {
    onStart: () => {}
}

export function intialize(folder: Folder): void {
    for (const [idx, Vmodule] of pairs(folder)) {
        const module = Vmodule as ModuleScript;
        if (module.IsA("ModuleScript")) {
            const reqModule = require(module) as InitModule;

            const onStart = reqModule.onStart;
            if (typeOf(onStart) !== undefined) {
                reqModule.onStart();
            }
        }
    }
}