export interface CreateOrderRequest {
  username: string;
  email: string;
  reffcode: string;
  order_id: number;
  amount: number;
  status: string;
  AccountID: number;
}

export interface GetOrderByUserRequest {
  AccountID: number;
}


