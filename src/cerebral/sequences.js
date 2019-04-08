import {state} from "cerebral";

export const setLoading = ({store}) =>
  store.set(state.isLoading, true);

export const unsetLoading = ({store}) =>
  store.set(state.isLoading, false);

export const getRegistryHistory = ({api}) =>
  api.getRegistryHistory().then((data) => ({history: data.users.history}));

export const getUserHistory = ({api, props}) =>
  api.getUserHistory(props.userId).then((data) => ({history: data.users.history}));

export const setHistory = ({store, props}) =>
  store.set(state.history, props.history);

export default {
  openRegistryHistory: [
    setLoading,
    getRegistryHistory,
    setHistory,
    unsetLoading,
  ],
  openUserHistory: [
    setLoading,
    getUserHistory,
    setHistory,
    unsetLoading,
  ],
}
