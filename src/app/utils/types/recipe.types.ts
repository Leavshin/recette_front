export type Recipe = {
    id: number;
    name: string;
    image_url?: string;
    prep_time: string;
    cook_time: string;
    description: string;
    portion: number;
    category: string;
}
