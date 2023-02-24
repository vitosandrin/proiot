import {
  FlexBox,
  Input,
  ListDevice,
  NewDevice,
  UpdateDevice,
} from "./components";
import { useState, useEffect } from "react";
import { api } from "./utils/axios";
import { IDevice } from "./interfaces/device";

function App() {
  const [devices, setDevices] = useState([]);

  const getAll = async () => {
    const result = await api.get("/device?limit=50");
    setDevices(result?.data?.data?.result);
  };
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
      <NewDevice onAction={getAll} />
    </FlexBox>
  );
}

export default App;
