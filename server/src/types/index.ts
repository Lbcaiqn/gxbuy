export interface Category {
  _id: number;
  cat_pid: number;
  cat_level: number;
  cat_name: string;
  cat_icon: string;
  children?: Category[] | null;
}
