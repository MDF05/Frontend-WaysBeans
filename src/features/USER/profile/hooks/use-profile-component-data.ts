import { useAppSelector } from "../../../../stores/stores";

export default function useProfileComponentData() {
  const state = useAppSelector((state) => state.profile);

  return { state };
}
