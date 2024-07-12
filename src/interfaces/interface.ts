export interface MenuItem {
    label: string;
    icon?: string;
    route?: string;
    command?: () => void;
    items?: MenuItem[];
};
export interface CardItem {
    title: string,
    image: string,
    subtitle: string
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
    imageUrl?: string,
    content: string
}