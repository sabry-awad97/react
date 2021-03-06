import { Fragment, useEffect } from "react";

import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useAppSelector, useActions } from "../state";

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells()
  }, [])

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
