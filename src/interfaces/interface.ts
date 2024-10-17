import { isCombinedModifierFlagSet } from "tslint";
import { inferRuntimeType } from "vue/compiler-sfc";

export interface MenuItem {
    label: string;
    icon?: string;
    route?: string;
    command?: () => void;
    items?: MenuItem[];
};
export interface CardItem {
    id: string,
    title: string,
    image: string,
    subtitle: string,
    content?: string
}
export interface MgrItem {
    position: string,
    imageUrl: string,
    title: string,
    name: string,
    description: string,
    description2?: string
}
export interface DialogItem {
    header: string,
    imageUrl: string,
    content?: string
}
export interface JwtPayload {
    sub: string,
    exp: number,
    roles: Array<String>
}
export interface ColumnItem {
    field: string,
    header: string,
    sortable?: boolean
};
export interface TablePage {
    current: number,
    pageSize: number,
    sortBy: string,
    desc: boolean
}
export interface AboutInfo {
    id: string,
    title: string,
    subtitle: string,
    enable: string,
    content: string,
    image: string,
    createId: string,
    createDate: string,
    updateId: string,
    updateDate: string 
}