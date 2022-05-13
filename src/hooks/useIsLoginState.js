import { useStore } from "vuex";
export const useIsLoginState = () => {
  const store = useStore();
  const isLogin = store.state.userInfo.token;
  if (isLogin) {
    return true;
  }
  return false;
};
