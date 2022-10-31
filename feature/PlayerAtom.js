import { atom } from "recoil";

export const playstate = atom({
    key: "playState",
    default: false
});

export const playingTrackState = atom({
    key: "playingTrackState",
    default: ""
});

export const bottom = atom({
    key: "bottom",
    default: []
});
export const coverurl = atom({
    key: "coverurl",
    default: ""
});
export const visibility = atom({
    key: "visibility",
    default: "not"
});
export const trackTracker = atom({
    key: "trackTracker",
    default: 0
});

export const trackTrackerin = atom({
    key: "trackTrackerin",
    default: 0
});
export const allmusic = atom({
    key: "allmusic",
    default: []
});
export const photo = atom({
    key: "photo",
    default: []
});
export const musicCover = atom({
    key: "music",
    default: []
});
export const musicin = atom({
    key: "musicin",
    default: []
});
export const click2 = atom({
    key: "click2",
    default: 0
});
export const opening = atom({
    key: "opening",
    default: false
});
