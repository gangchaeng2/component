import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  width: 1440px;

  > div {
    border: 1px solid;
  }

  li {
    height: 410px;
    padding-bottom: 0 !important;

    &:focus {
      outline: none !important;
    }
  }

  .test {
    width: 4180px !important;
  }
`;

export const CardWrap = styled.div`
  width: 100%;
`;

export const Card = styled.div`
  width: 580px;
  height: 410px;

  background-color: #ddd;
  text-align: center;
`;

export const Btn = styled.button`
  position: absolute;
  top: 125px;
  right: 130px;
  width: 100px;
  height: 50px;
`;
