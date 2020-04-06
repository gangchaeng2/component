import styled from 'styled-components';

export const Chart = styled.div`
  > svg {
    .x {
      .tick {
        text {
          fill: #888;
          font-size: 16px;

          tspan {
            font-size: 12px;
          }
        }
      }
    }

    .y {
      .tick {
        text {
          fill: #888888;
          font-size: 14px;
          font-weight: 300;
        }
        > line {
          stroke: #ececec;
          stroke-opacity: 0.7;
          shape-rendering: crispEdges;
        }
      }
    }
  }
`;
