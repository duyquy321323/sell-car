import { useState } from "react";
import { Typography, Button, Collapse, Box } from "@mui/material";
import "./Description.css";

export default function Description(props) {
  const { description } = props;
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ position: "relative", width: 700 }}>
      <h2 className="description">Mô tả</h2>
      <Collapse in={expanded} collapsedSize={150}>
        <Typography sx={{
          fontSize: "16px",
          fontStyle: 'normal',
          fontWeight: "400",
          lineHeight: "normal",
        }}>
          {description}
        </Typography>
      </Collapse>

      {/* Hiệu ứng shadow tối dần */}
      {!expanded && (
        <Box
          sx={{
            position: "absolute",
            bottom: 35,
            left: 0,
            width: "100%",
            height: 60,
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, var(--Dark-Secondary) 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Nút Xem thêm / Thu gọn */}
      <Button onClick={handleToggle} sx={{ mt: 1 }}>
        {expanded ? "Thu gọn" : "Xem thêm"}
      </Button>
    </Box>
  );
}
