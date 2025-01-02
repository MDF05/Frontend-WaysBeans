import { useForm } from "react-hook-form";
import { editProfileSchema, EditProfileSchema } from "../../../../schemas/edit-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { ProfileResponseDTO } from "../../../../DTO/profile-DTO";
import { putProfileUpdate } from "../../../../stores/profile/async-profile";
import { useModalEditProfileProps } from "../types/use-modal-edit-profile-types";
import avatarImage from "../../../../assets/image/profile.png";
import { useEffect, useState } from "react";

export default function useModalEditProfile({ onClose }: useModalEditProfileProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const state = useAppSelector((state) => state.profile);
  const image = watch("image");

  useEffect(() => {
    if (image?.length > 0) setPreviewImage(URL.createObjectURL(image[0]));
  }, [image]);

  setValue("name", state?.profile?.content?.profile?.name);
  setValue("email", state?.profile?.content?.profile?.user?.email ?? "");
  setValue("gender", state?.profile?.content?.profile?.gender ?? "");
  setValue("phone", state?.profile?.content?.profile?.phone ?? "");
  setValue("address", state?.profile?.content?.profile?.address ?? "");

  const dispatch = useAppDispatch();
  async function onSubmitEditProfile(event: EditProfileSchema) {
    try {
      const formData = new FormData();
      formData.append("name", event.name);
      formData.append("email", event.email);
      formData.append("gender", event.gender);
      formData.append("phone", event.phone);
      formData.append("address", event.address);

      if (event.image.length !== 0) formData.append("image", event.image[0]);
      else if (state?.profile?.content?.profile?.imageUrl) formData.append("imageUrl", `${state?.profile?.content?.profile?.imageUrl}`);

      const profileUpdate: ProfileResponseDTO = await dispatch(putProfileUpdate({ form: formData, profileId: state?.profile?.content.profile.id })).unwrap();
      if (profileUpdate.succes) {
        onClose();
        setPreviewImage(null);
      }
    } catch (e) {
      return e;
    }
  }

  return { register, handleSubmit, reset, onSubmitEditProfile, imageUrl: state?.profile?.content?.profile?.imageUrl, avatarImage, previewImage, setPreviewImage };
}
