"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/layout/AdminHeader";
import {
  Plus,
  MoreHorizontal,
  Mail,
  Edit,
  Trash2,
  Shield,
  UserCog,
  Eye,
} from "lucide-react";

const teamMembers = [
  {
    id: "1",
    name: "Chinedu Okafor",
    email: "chinedu@gobid.ng",
    role: "Super Admin",
    department: "Management",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Amara Eze",
    email: "amara@gobid.ng",
    role: "Admin",
    department: "Operations",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200",
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Oluwaseun Adeyemi",
    email: "seun@gobid.ng",
    role: "Support Lead",
    department: "Customer Support",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Fatima Ibrahim",
    email: "fatima@gobid.ng",
    role: "Support Agent",
    department: "Customer Support",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    lastActive: "2 hours ago",
  },
  // {
  //   id: "5",
  //   name: "David Nwosu",
  //   email: "david@gobid.ng",
  //   role: "Dispute Handler",
  //   department: "Disputes",
  //   status: "inactive",
  //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  //   lastActive: "3 days ago",
  // },
];

const roles = [
  "Super Admin",
  "Admin",
  "Support Lead",
  "Support Agent",
  "Dispute Handler",
  "Moderator",
];

const departments = ["Management", "Operations", "Customer Support", "Disputes", "Marketing"];

const AdminTeam = () => {
  const { toast } = useToast();
  const [isAddingMember, setIsAddingMember] = useState(false);

  const handleAddMember = () => {
    toast({
      title: "Invitation Sent",
      description: "Team member has been invited via email.",
    });
    setIsAddingMember(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Team Management
            </h1>
            <p className="text-muted-foreground">
              Manage your team members and their roles
            </p>
          </div>

          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Invite a new member to your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@gobid.ng"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleAddMember}>
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {teamMembers.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {teamMembers.filter((m) => m.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {new Set(teamMembers.map((m) => m.department)).size}
            </p>
            <p className="text-sm text-muted-foreground">Departments</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {new Set(teamMembers.map((m) => m.role)).size}
            </p>
            <p className="text-sm text-muted-foreground">Roles</p>
          </Card>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserCog className="h-4 w-4 mr-2" />
                      Change Role
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="h-3 w-3" />
                    {member.role}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Department
                  </span>
                  <span className="text-sm">{member.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      member.status === "active" ? "default" : "secondary"
                    }
                    className={
                      member.status === "active"
                        ? "bg-success/10 text-success"
                        : ""
                    }
                  >
                    {member.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Active
                  </span>
                  <span className="text-sm">{member.lastActive}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminTeam;
