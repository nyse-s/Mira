export type Notification = {
    id: string;
    userId: string;
    type: string;
    message: string;
    read: boolean;
    createdAt?: string;
  };
