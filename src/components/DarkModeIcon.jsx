import React from 'react'
import SettingsBrightnessOutlinedIcon from '@material-ui/icons/SettingsBrightnessOutlined';
import styled from 'styled-components';


export const DarkModeIcon = ({theme, setTheme}) => {

    return (
        <React.Fragment>
            <IconContainer>
              <SettingsBrightnessOutlinedIcon onClick={() => setTheme(!theme)} fontSize="large" style={{fill: "#504f4f", cursor: "pointer"}} />
            </IconContainer>
        </React.Fragment>
    )
}


// Style --------------------
const IconContainer = styled.div`
      /* position: fixed;
  top: 15px;
  right: 110px; */
  z-index: 20;


  
`
