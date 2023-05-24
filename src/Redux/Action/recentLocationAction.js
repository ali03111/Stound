import { types } from "../types";

export const setRecentLocation = payload => ({
    type: types.RecentLocation,
    payload,
});