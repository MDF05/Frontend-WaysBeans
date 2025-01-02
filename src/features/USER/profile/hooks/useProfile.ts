import { useEffect } from "react";
import { getProfileByIdUserLogin } from "../../../../stores/profile/async-profile";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfileByIdUserLogin());
  }, []);

  return { transactions: state?.profile?.content?.profile?.Transaction ?? [] };
}
