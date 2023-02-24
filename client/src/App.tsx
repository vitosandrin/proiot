import { useState, useEffect } from "react";
import { api } from "./utils/axios";
import {
  Button,
  FlexBox,
  LastRecord,
  ListDevice,
  Modal,
  NewDevice,
} from "./components";
import { theme } from "./theme";
import { socket } from "./utils/socket";
import { IDevice } from "./interfaces/device";

function App() {
  const [devices, setDevices] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [devicesReceived, setDevicesReceived] = useState<IDevice[]>();

  const getAll = async () => {
    const result = await api.get("/device?limit=50");
    setDevices(result?.data?.data?.result);
  };

  useEffect(() => {
    socket.on("receiveDevices", (data) => {
      console.log("devices", data);
      setDevicesReceived(data);
    });
  }, [socket]);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <FlexBox gap="xs" align="center" justify="space-around" direction="column">
      <ListDevice
        devices={devicesReceived ? devicesReceived : devices}
        handleRemoveClick={getAll}
        handleUpdateClick={getAll}
      />
      <Button
        hoverColor={theme.colors.neutral[1]}
        backgroundColor={theme.colors.neutral.pure}
        primaryColor={theme.font.colors.white}
        text="Create New Device"
        onClick={() => setModalOpened(true)}
      />
      <LastRecord />
      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        <NewDevice onAction={getAll} />
      </Modal>
    </FlexBox>
  );
}

export default App;
