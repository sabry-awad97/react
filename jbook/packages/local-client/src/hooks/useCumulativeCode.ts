import { useAppSelector } from "../state";

export const useCumulativeCode = (cellId: string) => {
  return useAppSelector(state => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(`
            import _React from 'react';
            import _ReactDOM from 'react-dom';
            
            var show = (value) => {
              const root = document.querySelector('#root');

              if (typeof value === 'object') {
                if (value.$$typeof && value.props) {
                  _ReactDOM.render(value, root);
                } else {
                  root.innerHTML = JSON.stringify(value);
                }
              } else {
                root.innerHTML = value;
              }
            };
          `);
        } else {
          cumulativeCode.push("var show = () => {}");
        }
        cumulativeCode.push(c.content);
      }

      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
