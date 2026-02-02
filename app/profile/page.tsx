"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  CreditCard,
  Camera,
  CheckCircle,
  Star,
  Upload,
  Settings,
} from "lucide-react";

interface ProfileData {
  profileImage: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

const defaultProfile: ProfileData = {
  profileImage:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "john.doe@email.com",
  phone: "+234 801 234 5678",
  location: "Lagos, Nigeria",
  bio: "Tech enthusiast and collector. Passionate about finding great deals on quality electronics.",
};

const PROFILE_STORAGE_KEY = "user_profile_data";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from localStorage or use defaults
  const [profile, setProfile] = useState<ProfileData>(() => {
    let saved;
    if (typeof window !== "undefined") {
      // Access localStorage here, it is safe in the browser environment
      saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    }
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfile((prev) => ({ ...prev, profileImage: base64 }));
        toast({
          title: "Image Updated",
          description:
            "Your profile image has been changed. Click 'Save Changes' to apply.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    setIsEditing(false);
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback className="text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                <Badge className="bg-success/10 text-success border-success/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <p className="text-muted-foreground">@{profile.username}</p>
              <div className="flex items-center gap-4 mt-3 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning fill-warning" />
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground">(127 reviews)</span>
                </div>
                <span className="text-muted-foreground">
                  Member since Jan 2024
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/account-settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">45</p>
            <p className="text-sm text-muted-foreground">Auctions Won</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">23</p>
            <p className="text-sm text-muted-foreground">Items Sold</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">127</p>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">98%</p>
            <p className="text-sm text-muted-foreground">Positive Rating</p>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="p-6 space-y-6">
              {isEditing && (
                <div className="p-4 bg-primary/10 rounded-lg flex items-start gap-3">
                  <Upload className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">
                      Update Profile Picture
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Click the camera icon on your profile picture to upload a
                      new image
                    </p>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => updateField("username", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Badge className="bg-success/10 text-success shrink-0">
                    Verified
                  </Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Badge className="bg-success/10 text-success shrink-0">
                    Verified
                  </Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1.5"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 space-y-6">
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Security Settings
                </h3>
                <p className="text-muted-foreground mb-6">
                  Manage your password, two-factor authentication, and other
                  security settings
                </p>
                <Button asChild>
                  <Link href="/account-settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Go to Account Settings
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                {[
                  {
                    title: "Bid Notifications",
                    description: "Get notified when you're outbid",
                    enabled: true,
                  },
                  {
                    title: "Auction Ending Soon",
                    description: "Reminders for auctions ending soon",
                    enabled: true,
                  },
                  {
                    title: "New Messages",
                    description: "Notifications for new chat messages",
                    enabled: true,
                  },
                  {
                    title: "Promotional Emails",
                    description: "Receive deals and offers",
                    enabled: false,
                  },
                  {
                    title: "Newsletter",
                    description: "Weekly newsletter with trending items",
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Saved Cards</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">**** **** **** 4521</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/25
                        </p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add New Card
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-4">Bank Accounts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">GTBank - **** 4521</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.firstName} {profile.lastName}
                      </p>
                    </div>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Bank Account
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Profile;
