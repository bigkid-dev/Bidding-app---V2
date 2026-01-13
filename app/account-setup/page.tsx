"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Lock,
  Eye,
  EyeOff,
  Bell,
  Shield,
  Trash2,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AccountSettings = () => {
  const { toast } = useToast();
  const navigate = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailBidUpdates: true,
    emailAuctionEnd: true,
    emailNewListings: false,
    pushBidUpdates: true,
    pushAuctionEnd: true,
    pushMessages: true,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showBidHistory: false,
    allowMessages: true,
  });

  // Check if user is logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate.push("/auth");
    }
  }, [navigate]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    // Get current user and verify password
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userIndex = users.findIndex(
      (u: any) => u.email === currentUser.email
    );

    if (userIndex === -1 || users[userIndex].password !== currentPassword) {
      toast({
        title: "Incorrect password",
        description: "Current password is incorrect.",
        variant: "destructive",
      });
      setIsChangingPassword(false);
      return;
    }

    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("notificationSettings", JSON.stringify(updated));
      return updated;
    });
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("privacySettings", JSON.stringify(updated));
      return updated;
    });
    toast({
      title: "Settings updated",
      description: "Your privacy settings have been saved.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate.push("/");
  };

  const handleDeleteAccount = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.filter(
      (u: any) => u.email !== currentUser.email
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userProfile");

    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
    });
    navigate.push("/");
  };

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account security and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Email Notifications
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bid Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you're outbid
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailBidUpdates}
                    onCheckedChange={() =>
                      handleNotificationChange("emailBidUpdates")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auction Ending</p>
                    <p className="text-sm text-muted-foreground">
                      Reminder when auctions you're watching end soon
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailAuctionEnd}
                    onCheckedChange={() =>
                      handleNotificationChange("emailAuctionEnd")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Listings</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new items in your categories
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNewListings}
                    onCheckedChange={() =>
                      handleNotificationChange("emailNewListings")
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Push Notifications
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bid Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Instant alerts when you're outbid
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushBidUpdates}
                    onCheckedChange={() =>
                      handleNotificationChange("pushBidUpdates")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auction Ending</p>
                    <p className="text-sm text-muted-foreground">
                      Alert when watched auctions end soon
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushAuctionEnd}
                    onCheckedChange={() =>
                      handleNotificationChange("pushAuctionEnd")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new messages
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushMessages}
                    onCheckedChange={() =>
                      handleNotificationChange("pushMessages")
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control your profile visibility and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Allow others to view your profile
                  </p>
                </div>
                <Switch
                  checked={privacy.showProfile}
                  onCheckedChange={() => handlePrivacyChange("showProfile")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Bid History</p>
                  <p className="text-sm text-muted-foreground">
                    Display your bidding activity on your profile
                  </p>
                </div>
                <Switch
                  checked={privacy.showBidHistory}
                  onCheckedChange={() => handlePrivacyChange("showBidHistory")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Messages</p>
                  <p className="text-sm text-muted-foreground">
                    Let other users send you messages
                  </p>
                </div>
                <Switch
                  checked={privacy.allowMessages}
                  onCheckedChange={() => handlePrivacyChange("allowMessages")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Log Out</p>
                  <p className="text-sm text-muted-foreground">
                    Sign out of your account on this device
                  </p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default AccountSettings;
