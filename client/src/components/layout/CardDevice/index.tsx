import { IDevice } from "../../../interfaces/device";
import { theme } from "../../../theme";
import { api } from "../../../utils/axios";
import { UpdateDevice } from "../../form/UpdateDevice";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Container } from "./styles";
import { useState } from "react";
interface ICardDeviceProps {
  data: IDevice;
  index: number;
  handleUpdateClick: () => void;
  handleRemoveClick: () => void;
}

export const CardDevice = ({
  data,
  index,
  handleRemoveClick,
  handleUpdateClick,
}: ICardDeviceProps) => {
  const [modalOpened, setModalOpened] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    try {
      await api.delete(`/device/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      handleRemoveClick();
      console.log("ok");
    }
  };

  return (
    <Container
      key={index}
      gap="xs"
      align="center"
      justify="flex-start"
      direction="column"
    >
      <h2>Device Data:</h2>
      <p>Name: {data?.name}</p>
      <p>Description: {data?.description!}</p>
      <p>Sensor Name: {data?.sensor?.sensorName}</p>
      <p>Humidity: {data?.sensor?.humidity}</p>
      <p>Temperature: {data?.sensor?.temperature}</p>
      <Button
        hoverColor={theme.colors.neutral[1]}
        backgroundColor={theme.colors.neutral.pure}
        primaryColor={theme.font.colors.white}
        text="Update"
        onClick={() => setModalOpened(data?._id!)}
      />
      <Button
        hoverColor={theme.colors.neutral[1]}
        backgroundColor={theme.colors.neutral.pure}
        primaryColor={theme.font.colors.white}
        text="Remove"
        onClick={() => handleRemove(data?._id!)}
      />
      <Modal open={!!modalOpened} onClose={() => setModalOpened(null)}>
        <UpdateDevice onAction={handleUpdateClick} deviceId={modalOpened} />
      </Modal>
    </Container>
  );
};
