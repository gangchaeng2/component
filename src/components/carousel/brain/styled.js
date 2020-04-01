import styled from 'styled-components';

export const Wrap = styled.div`
  width: 1440px;
`;

export const Card = styled.div`
  margin-right: ${props => (props.isLast ? 0 : '20px')};
  width: 580px;
  height: 410px;
  background-color: #ddd;
  text-align: center;
`;
