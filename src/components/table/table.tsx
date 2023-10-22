import {ComponentProps} from "react";

import s from "./table.module.scss";

type RootProps = ComponentProps<"table">;

const Root = ({ className, children, ...rest }: RootProps) => {
  return (
    <table className={s.table} {...rest}>
      {children}
    </table>
  );
};

type HeadProps = ComponentProps<"thead">;

const Head = ({ children, ...rest }: HeadProps) => {
  return <thead {...rest}>{children}</thead>;
};

type BodyProps = ComponentProps<"tbody">;

const Body = ({ children, ...rest }: BodyProps) => {
  return <tbody {...rest}>{children}</tbody>;
};

type RowProps = ComponentProps<"tr">;

const Row = ({ children, ...rest }: RowProps) => {
  return (
    <tr className={s.tableRow} {...rest}>
      {children}
    </tr>
  );
};

type HeadCellProps = ComponentProps<"th">;

const HeadCell = ({ className, children, ...rest }: HeadCellProps) => {
  return (
    <th className={""} {...rest}>
      {children}
    </th>
  );
};

type CellProps = ComponentProps<"td">;

const Cell = ({ className, children, ...rest }: CellProps) => {
  return (
    <td className={""} {...rest}>
      {children}
    </td>
  );
};

export const Table = { Root, Head, Body, Row, HeadCell, Cell };
