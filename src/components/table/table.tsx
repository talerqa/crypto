import {ComponentProps} from "react";

import s from "./table.module.scss";

type RootProps = ComponentProps<"table">;

const Root = ({className, children, ...rest}: RootProps) => {
  return (
    <table className={s.table + ' ' + className} {...rest}>
      {children}
    </table>
  );
};

type HeadProps = ComponentProps<"thead">;

const Head = ({children, ...rest}: HeadProps) => {
  return <thead className={s.head} {...rest}>{children}</thead>;
};

type BodyProps = ComponentProps<"tbody">;

const Body = ({children, ...rest}: BodyProps) => {
  return <tbody className={s.body} {...rest}>{children}</tbody>;
};

type RowProps = ComponentProps<"tr">;

const Row = ({className, children, ...rest}: RowProps) => {
  return (
    <tr className={s.tableRow + ' ' + className} {...rest}>
      {children}
    </tr>
  );
};

type CellProps = ComponentProps<"td">;
const Cell = ({className, children, ...rest}: CellProps) => {
  return (
    <td className={s.cell + ' ' + className} {...rest}>
      {children}
    </td>
  );
};

type HeadCellProps = ComponentProps<"th">;

const HeadCell = ({className, children, ...rest}: HeadCellProps) => {
  return (
    <th className={s.headCell} {...rest}>
      {children}
    </th>
  );
};


export const Table = {Root, Head, Body, Row, HeadCell, Cell};
