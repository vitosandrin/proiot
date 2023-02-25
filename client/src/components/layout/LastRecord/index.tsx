import { useState, useEffect } from "react";
import styled from "styled-components";
import { IDevice } from "../../../interfaces/device";

import { FlexBox } from "../../../components";
import { socket } from "../../../utils/socket";

const ContainerData = styled(FlexBox)`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.types.dragon};
`;
export const LastRecord = () => {
  const [deviceReceived, setDeviceReceived] = useState<IDevice>();

  useEffect(() => {
    socket.on("receiveDevice", (data) => {
      setDeviceReceived(data);
    });
  }, [socket]);

  return (
    <>
      <h2>Last Socket Record:</h2>

      {deviceReceived && (
        <ContainerData align="center" justify="center" direction="column">
          <p>Name: {deviceReceived?.name}</p>
          <p>Description: {deviceReceived?.description!}</p>
          <p>Sensor Name: {deviceReceived?.sensor?.sensorName}</p>
          <p>Humidity: {deviceReceived?.sensor?.humidity}</p>
          <p>Temperature: {deviceReceived?.sensor?.temperature}</p>
        </ContainerData>
      )}
    </>
  );
};
