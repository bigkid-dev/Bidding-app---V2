"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminHeader from "@/components/layout/AdminHeader";
import {
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  Mail,
  UserX,
} from "lucide-react";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 801 234 5678",
    status: "active",
    verified: true,
    joinDate: "Jan 15, 2024",
    totalBids: 45,
    totalSales: 12,
  },
  {
    id: "2",
    name: "Amara Okafor",
    email: "amara.o@email.com",
    phone: "+234 802 345 6789",
    status: "active",
    verified: true,
    joinDate: "Feb 20, 2024",
    totalBids: 28,
    totalSales: 5,
  },
  {
    id: "3",
    name: "Mike Peters",
    email: "mike.p@email.com",
    phone: "+234 803 456 7890",
    status: "suspended",
    verified: false,
    joinDate: "Mar 10, 2024",
    totalBids: 3,
    totalSales: 0,
  },
  {
    id: "4",
    name: "Fatima Ibrahim",
    email: "fatima.i@email.com",
    phone: "+234 804 567 8901",
    status: "active",
    verified: true,
    joinDate: "Dec 5, 2023",
    totalBids: 89,
    totalSales: 34,
  },
  {
    id: "5",
    name: "David Adeyemi",
    email: "david.a@email.com",
    phone: "+234 805 678 9012",
    status: "pending",
    verified: false,
    joinDate: "Apr 1, 2024",
    totalBids: 0,
    totalSales: 0,
  },
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all registered users
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Button>Export Users</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{users.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {users.filter((u) => u.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {users.filter((u) => u.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">
              {users.filter((u) => u.status === "suspended").length}
            </p>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Bids</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active"
                          ? "default"
                          : user.status === "suspended"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        user.status === "active"
                          ? "bg-success/10 text-success"
                          : ""
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.verified ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.totalBids}</TableCell>
                  <TableCell>{user.totalSales}</TableCell>
                  <TableCell className="text-right">
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
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-success">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <UserX className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default AdminUsers;
