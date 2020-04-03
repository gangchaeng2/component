import styled from 'styled-components';

export const Chart = styled.div`
  > svg {
    .x {
      .domain {
        color: #ececec;
        background-color: #ececec;
      }
    }
    .y {
      .domain {
        opacity: 0;
      }
    }
  }
`;
