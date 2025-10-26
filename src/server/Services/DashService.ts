import { ReplicatedStorage } from "@rbxts/services";
import config from "shared/Utils/Dash/config";

const Events = ReplicatedStorage.FindFirstChild("Events") as Folder;
const dashEvent = Events.FindFirstChild("DashEvent") as RemoteEvent;


const directions = new Map<string, Vector3>();
directions.set("W", new Vector3(0, 0, -1));
directions.set("A", new Vector3(-1, 0, 0));
directions.set("S", new Vector3(0, 0, 1));
directions.set("D", new Vector3(1, 0, 0));

const playersCooldowns = new Map<Player, number>();


function dash(player: Player, direction: Vector3): void {
    const dashDuration: number = config.duration;
    const velocity: number = config.velocity;
    const dashVelocity = direction.mul(velocity);

    const character: Model = player.Character ?? player.CharacterAdded.Wait()[0];
    const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;

    const startVelocity = humanoidRootPart.AssemblyLinearVelocity;

    humanoidRootPart.AssemblyLinearVelocity = dashVelocity;

    task.wait(dashDuration);

    humanoidRootPart.AssemblyLinearVelocity = startVelocity; // maybe change to vector.zero

}


dashEvent.OnServerEvent.Connect((player: Player, args) => {
    const param = args as string;
    if(!args || args === undefined) return;

    const time = os.time();
    const cooldown = playersCooldowns.has(player);
    if(cooldown === false) {
        playersCooldowns.set(player, 0);
    } else {
        const playerCooldown = playersCooldowns.get(player) as number;
        const lastDash = time - playerCooldown;
        if (lastDash < config.cooldown) return;
        playersCooldowns.set(player, time);
    }

    const dir = directions.get(param) as Vector3;
    dash(player, dir)
})