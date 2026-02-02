"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  title: string;
  image: string;
  currentBid: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => [...prev, item]);
    toast.success(`${item.title} added to watchlist`);
  };

  const removeFromWishlist = (id: string) => {
    const item = wishlist.find((i) => i.id === id);
    setWishlist((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      toast.success(`${item.title} removed from watchlist`);
    }
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
