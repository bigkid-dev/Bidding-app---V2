"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Trash2,
  Gavel,
  TrendingUp,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "outbid" | "won" | "ending" | "shipped" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "outbid",
    title: "You've been outbid!",
    message: "Someone placed a higher bid on iPhone 15 Pro Max",
    time: "2 min ago",
    read: false,
    link: "/auction/1",
  },
  {
    id: "2",
    type: "ending",
    title: "Auction ending soon",
    message: "Samsung Galaxy S24 Ultra ends in 30 minutes",
    time: "15 min ago",
    read: false,
    link: "/auction/2",
  },
  {
    id: "3",
    type: "won",
    title: "Congratulations! You won!",
    message: "You won the auction for MacBook Pro M3",
    time: "1 hour ago",
    read: false,
    link: "/my-bids",
  },
  {
    id: "4",
    type: "shipped",
    title: "Item shipped",
    message: "Your Sony WH-1000XM5 has been shipped",
    time: "2 hours ago",
    read: true,
    link: "/my-bids",
  },
  {
    id: "5",
    type: "system",
    title: "Welcome to GObid!",
    message: "Complete your profile to start bidding",
    time: "1 day ago",
    read: true,
    link: "/profile",
  },
];

const NotificationsDropdown = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "outbid":
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      case "won":
        return <Gavel className="h-4 w-4 text-secondary" />;
      case "ending":
        return <AlertCircle className="h-4 w-4 text-primary" />;
      case "shipped":
        return <Package className="h-4 w-4 text-secondary" />;
      case "system":
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs text-primary"
              onClick={markAllAsRead}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[320px]">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} asChild className="p-0">
                <Link
                  href={notification.link || "#"}
                  onClick={() => markAsRead(notification.id)}
                  className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-accent transition-colors ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm ${
                          !notification.read ? "font-semibold" : ""
                        }`}
                      >
                        {notification.title}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                        onClick={(e) => deleteNotification(notification.id, e)}
                      >
                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                  )}
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={clearAll}
              >
                Clear all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
