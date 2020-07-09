import React, { useContext } from "react"
import { ThemeContext } from "../../theme.js"
import styled from "styled-components"

const SvgDiv = styled.div`
  width: 30px;
  height: 30px;
  margin: auto 0;
  svg {
    fill: ${props => (props.color ? props.color : "#F0F3F5")};
    cursor: pointer;
  }
`

export default () => {
  const { changeMode, themeColors } = useContext(ThemeContext)

  return (
    <SvgDiv color={themeColors.fontColor}>
      <svg
        onClick={() => changeMode()}
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        viewBox="0 0 24 24"
        width="30"
      >
        <path d="M24 0H0v24h24z" fill="none" />
        <path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z" />
      </svg>
    </SvgDiv>
  )
}
