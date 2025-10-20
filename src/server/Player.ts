import { Players } from "@rbxts/services";
import ProfileStore, { Profile } from "@rbxts/profile-store";

const DATASTORE_NAME = "test";
const PLAYER_PROFILE = {
    cash: 0,
}

const PlayerStore = ProfileStore.New(
    DATASTORE_NAME,
    PLAYER_PROFILE,
)

type ProfileSession = typeof PLAYER_PROFILE;

const Profiles = new Map<Player, Profile<ProfileSession>>();

function loadData(player: Player) {
    const key = `user_` + `${player.UserId}`;
    const profile = PlayerStore.StartSessionAsync(key, {
        Cancel: () => {
            return player.Parent !== Players;
        }
    });

    if (profile !== undefined) {

        profile.AddUserId(player.UserId);
        profile.Reconcile();

        profile.OnSessionEnd.Connect(() => {
            Profiles.delete(player);
            player.Kick("Profile session end - Please rejoin");
        })

        if (player.Parent === Players) {
            Profiles.set(player, profile);

        } else { profile.EndSession(); }
    } else { player.Kick(); }
}

function createLeaderstats(player: Player) {
    const leaderstats = new Instance("Folder");
    leaderstats.Name = "leaderstats";

    const kills = new Instance("IntValue");
    kills.Name = "Kills";
    kills.Value = 0;
    
    leaderstats.Parent = player;
    kills.Parent = leaderstats;
}

Players.PlayerAdded.Connect(player => {
    createLeaderstats(player);
    

    loadData(player);
})

Players.PlayerRemoving.Connect(player => {
    const profile = Profiles.get(player);
    if (profile !== undefined) {
        profile.EndSession();
    }
})