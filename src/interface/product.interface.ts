export interface BaseProduct {
	name: string;
	price: number;
	short_description: string;
	image: string;
	manufacture_date: Date;
	category: string;
}

export interface Product extends BaseProduct {
	id: number;
}
