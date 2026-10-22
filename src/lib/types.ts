export interface Item {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  createdAt: string;
  specifications: Record<string, string>;
  tags?: string[];
  featured?: boolean;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isDemo?: boolean;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
