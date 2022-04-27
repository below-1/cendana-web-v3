import { User } from './user.model';

export type StockItem = {
  id:           number;
  createdAt:    string;
  updatedAt:    string;

  author?:      User;
  authorId:     number; 

  product?:      any;
  productId:     number;

  order?:        any;
  orderId:      number;

  orderItems?:   any[];

  buyPrice:    string;
  sellPrice:    string;
  discount:    number;

  quantity:    number;
  available:    number;
  sold:        number;
  defect:      number;
  returned:    number;
}