interface SpanType {
  text?: string;
  code?: string;
  mark?: string;
}

export interface CommonCardHeaderProp {
  title: string;
  span?: SpanType[];
  headClass?: string;
  icon?: JSX.Element;
  tagClass?: string;
}
export interface TabContentProp {
  basicTab: string;
}
interface ItemsArray {
  item?: string;
  divider?: boolean;
}

interface itemArray extends React.HTMLAttributes<HTMLElement> {
  btnColor?: string;
  btnText: string;
  items: ItemsArray[];
  dropClassName?: string;
  toggleClassName?: string;
  size?: string;
}
export interface CommonDropdownProp {
  item: itemArray;
}

interface ItemsArrays {
  item: string;
}
interface ArrayType {
  btnColor: string;
  btnText: string;
  items: ItemsArrays[];
}
export interface SplitButtonDropdownProp {
  item: ArrayType;
}

interface ItemProps {
  item: string;
}

export interface CommonAlignmentProp {
  value: {
    items: ItemProps[];
    btnText: string;
    btnColor: string;
    directions: any;
    dropClassName: string;
  };
}

interface ItemProp {
  id: number;
  placement?: any;
  popoverHeader?: string;
  popoverBody?: string;
  btnColor?: string;
  btnText?: string;
  trigger?: string;
  size?: string;
}

export interface CommonPopoverProp {
  key?: number;
  item: ItemProp;
}

interface Itemtype {
  id: number;
  placement?: any;
  tooltip?: string | JSX.Element;
  btnColor?: string;
  btnText?: string;
  className?: string;
}

export interface CommonTooltipProp {
  item: Itemtype;
  outline?: boolean;
}

export interface CommonModalType {
  children?: React.ReactNode;
  size?: string;
  isOpen?: boolean;
  toggle?: () => void;
  title?: string;
  modalBodyClassName?: string;
  modalTitleClassName?: string;
  heading?: string;
  sizeTitle?: string;
  fullTitle?: string;
  staticTitle?: string;
  fullscreen?: true | "sm" | "md" | "lg" | "xl" | "xxl";
  centered?: boolean;
  onClosed?: () => void;
  backdrop?: boolean | "static";
}

export interface FormSubmitProp {
  modal: () => void;
}

export interface CommonFullScreenDataType {
  color: string;
  onClick: () => void;
  title: string;
  fullscreen: "sm" | "md" | "lg" | "xl" | "xxl";
  isOpen: boolean;
  toggle: () => void;
}

export interface ToggleModalType {
  nestedModal?: boolean;
  closeAll?: boolean;
  toggle?: () => void;
  toggleNested?: () => void;
  toggleAll: () => void;
}

export interface ProfileModalType {
  modalOne: boolean;
  modalOneToggle: () => void;
}

export interface BalanceModalType {
  modalThird: boolean;
  modalThirdToggle: () => void;
}

export interface CommonRihoModalTitleType {
  heading: string;
  subHeading: string;
  text: string;
}

export interface StaticModalToggleProp {
  staticModalToggle: () => void;
}
interface DataProp {
  className?: string;
  text: string;
  title?: string;
}

interface NumberProp {
  className?: string;
  text?: string;
  icon?: JSX.Element;
}

export interface CommonTagCardBodyType {
  data?: DataProp[];
  number?: NumberProp[];
  pill?: boolean;
}

export interface GridCommonCardFooterType {
  className: string;
  valueClass: string;
}
