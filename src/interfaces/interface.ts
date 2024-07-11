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