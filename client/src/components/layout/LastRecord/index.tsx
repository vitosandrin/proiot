import { useState, useEffect } from "react";
import styled from "styled-components";
import { FlexBox } from "../../utils/Flexbox";
import { socket } from "../../../utils/socket";
import { IDevice } from "../../../interfaces/device";

export const LastRecord = () => {
  const [deviceReceived, setDeviceReceived] = useState<IDevice>();

  const ContainerData = styled(FlexBox)`
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.types.dragon};
  `;

  useEffect(() => {
    socket.on("receiveAll", (data) => {
      alert(data.message);
    });

    socket.on("receiveDevice", (data) => {
      console.log("device ", data);
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
