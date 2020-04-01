import styled, { css } from 'styled-components';

export const StackedBar = styled.div`
  display: flex;
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
  background-color: #ddd;
`;

export const Stack = styled.div`
  width: ${({ per }) => per}%;
  background-color: ${({ color }) => color};
`;
