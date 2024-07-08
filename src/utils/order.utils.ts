export interface CreateOrderRequest {
  username: string;
  email: string;
  reffcode: string;
  order_id: string;
  amount: number;
  status: string;
  AccountID: number;
}

export interface GetOrderByUserRequest {
  AccountID: number;
}


