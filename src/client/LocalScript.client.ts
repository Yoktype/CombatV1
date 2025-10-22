import { Players } from "@rbxts/services"
import { intialize } from "shared/Utils/initialize";
const LOCAL_PLAYER = Players.LocalPlayer;


const components = script.Parent?.FindFirstChild("Components") as Folder;
const controllers = script.Parent?.FindFirstChild("Controllers") as Folder;


intialize(components);
intialize(controllers);