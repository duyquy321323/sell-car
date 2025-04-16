import React from "react";
import { Grid, FormControlLabel, Checkbox, Typography, Paper } from "@mui/material";

export default function FeatureCheckboxes(props) {

    const { features } = props;

  return (
    <Paper sx={{ width: '700px', marginTop: "72px",  backgroundColor: "var(--Dark-Secondary)", color: "white" }}>
      <Typography sx={{
        color: "var(--Gray-3, #D7D7D7)",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        marginBottom: '16px'
      }}>
        Tính năng
      </Typography>
      <Grid container spacing={2}>
        {features?.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ p: 1, backgroundColor: "#12232E" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked sx={{ color: "white" }} />}
                label={feature.name}
                sx={{ color: "white" }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
