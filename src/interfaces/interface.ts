
export interface MenuItem {
    label: string;
    icon?: string;
    route?: string;
    command?: () => void;
    items?: MenuItem[];
};
export interface CardItem {
    id: number,
    title: string,
    image: string,
    subtitle: string,
    content?: string
}
export interface MgrItem {
    id: number,
    position: string | undefined,
    image: string,
    title: string,
    name: string,
    description1: string,
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
    width?: string,
    sortable?: boolean
};
export interface TablePage {
    current: number,
    pageSize: number,
    sortBy: string,
    desc: boolean
}
export interface AboutInfo {
    id: number | undefined | null,
    title: string,
    subtitle: string,
    enable: string,
    content: string,
    image: string | undefined,
    createId: string,
    createDate: string,
    updateId: string,
    updateDate: string 
}
export interface ManagerInfo {
    id: number | undefined | null,
    title: string,
    name: string,
    image: string | undefined,
    description1: string,
    description2: string,
    createId: string,
    createDate: string,
    updateId: string,
    updateDate: string
}
export interface ActivityInfo {
    id: number | undefined | null,
    title: string,
    subtitle: string,
    applyStartDate: Date | null,
    applyEndDate: Date | null,
    content: string,
    image: string | undefined,
    activityGroup: string,
    createId: string,
    createDate: string,
    updateId: string,
    updateDate: string 
}
export interface ApplyForm {
    applyName: string,
    applySex: string | null | undefined,
    applyPhone: string,
    applyEmail: string | null | undefined,
    applyResidence: string | null | undefined,
    infoFrom: string,
    introducerName: string | null | undefined
}