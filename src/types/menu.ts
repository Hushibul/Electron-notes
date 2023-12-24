type subItemType = {
  label?: string;
  role?: string;
  accelerator?: string;
  click?: () => void;
  type?: string;
};

export type MenuType = {
  label: string;
  submenu: (subItemType | MenuType)[];
};
