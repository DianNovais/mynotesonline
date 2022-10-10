import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import "./Radio.css";

const RadioContent = ({ setTyped })  => {
  return (
    <div className="radio">
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Tipo de Nota
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <div className="grupos">
            <FormControlLabel
            className="margin"
              value="all"
              control={
                <Radio
                  color="default"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                  onChange={async () => {
                    await setTyped(prevState => prevState = 1)
                }}
                
                />
              }
            />
            <span>All</span>

            <FormControlLabel
              value="priority"
              control={
                <Radio
                  color="default"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                  onChange={async () => {
                    await setTyped(prevState => prevState = 2)
                }}
                
                />
              }
            />
            <span>Priority</span>

            <FormControlLabel
              value="neutral"
              control={
                <Radio
                  color="default"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                  onChange={() => {
                    setTyped(prevState => prevState = 3)
                }}
               
                />
              }
              labelPlacement="bottom"
            />
            <span>Common</span>
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioContent;
