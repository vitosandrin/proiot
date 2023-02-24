import { useState, useEffect } from "react";
import { api } from "./utils/axios";
import { socket } from "./utils/socket";
import { IDevice } from "./interfaces/device";

import {
  Button,
  FlexBox,
  LastRecord,
  ListDevice,
  Modal,
  NewDevice,
} from "./components";
import { theme } from "./theme";

function App() {
  const [devices, setDevices] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

  const getAll = async () => {
    const result = await api.get("/device?limit=50");
    setDevices(result?.data?.data?.result);
  };

  useEffect(() => {
    socket.on("receiveDevices", (data) => {
      console.log("devices", data);
      setDevices(data);
    });
  }, [socket]);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <FlexBox gap="xs" align="center" justify="space-around" direction="column">
      <ListDevice
        devices={devices}
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
