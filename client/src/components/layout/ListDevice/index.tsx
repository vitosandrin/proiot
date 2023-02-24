import { IDevice } from "../../../interfaces/device";
import { CardDevice } from "../CardDevice";
import { Container } from "./styles";
interface ListDeviceProps {
  devices: IDevice[];
  handleRemoveClick: () => void;
  handleUpdateClick: () => void;
}
export const ListDevice = ({
  devices,
  handleRemoveClick,
  handleUpdateClick,
}: ListDeviceProps) => {
  return (
    <Container gap="xs" align="center" justify="center" direction="row">
      {devices.length > 0 ? (
        devices.map((data, index) => (
          <CardDevice
            index={index}
            data={data}
            handleUpdateClick={handleUpdateClick}
            handleRemoveClick={handleRemoveClick}
          />
        ))
      ) : (
        <p>0 devices registereds in database</p>
      )}
    </Container>
  );
};
