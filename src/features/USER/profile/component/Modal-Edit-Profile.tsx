import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { ModalEditProfileProps } from "../types/modal-edit-profile-props";
import useModalEditProfile from "../hooks/use-modal-edit-profile";

export default function ModalEditProfile({ isOpen, onClose }: ModalEditProfileProps): React.ReactNode {
  const { handleSubmit, onSubmitEditProfile, register, reset, imageUrl, avatarImage, previewImage, setPreviewImage } = useModalEditProfile({ onClose });

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => {
          setPreviewImage(null);
          onClose();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit((event) => onSubmitEditProfile(event))} bg={"black"}>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} color={"white"} gap={"5px"} display={"grid"} gridTemplateColumns={{ base: "100%", lg: "50% 50%" }}>
            <Grid gap={"10px"}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type={"text"} {...register("name")} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type={"email"} {...register("email")} />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input type={"number"} {...register("phone")} />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select placeholder="Select option" {...register("gender")}>
                  <option value="male">Male</option>
                  <option value="female">female</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Textarea {...register("address")} />
              </FormControl>
              <FormControl>
                <FormLabel>image</FormLabel>
                <Input type={"file"} {...register("image")} />
              </FormControl>
            </Grid>
            <Grid>
              <Image height={"100%"} w={"100%"} alt="profile image" src={previewImage ?? imageUrl ?? avatarImage}></Image>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type={"submit"}>
              Save
            </Button>
            <Button
              onClick={() => {
                reset();
                setPreviewImage(null);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
