import { Button, useMediaQuery } from "@mui/material";
import { checkIfUrlIsImage } from "../../utils/helpers";
import DriveFileMoveSharpIcon from "@mui/icons-material/DriveFileMoveSharp";

const ViewAttachedMedia = ({ src, name }: { src: string; name: string }) => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isImage = checkIfUrlIsImage(src ?? "");
  if (isImage) {
    return (
      <img
        src={src as string}
        alt={name}
        style={{ width: isTablet ? "200px" : "400px", backgroundSize: "cover" }}
      />
    );
  }
  return <Button variant="outlined"><DriveFileMoveSharpIcon />{name}</Button>;
};

export default ViewAttachedMedia;
