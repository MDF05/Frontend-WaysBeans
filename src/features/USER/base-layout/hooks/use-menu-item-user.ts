import { useAppSelector } from "../../../../stores/stores";

export default function useMenuItemUser() {
  const state = useAppSelector((state) => state.profile);

  return { state };
}
