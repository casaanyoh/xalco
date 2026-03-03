import { useState } from "react";
import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Shield,
  Bell,
  Key,
  Save,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@xalco.com",
    phone: "+1 (555) 123-4567",
    address: "123 Commerce St, Suite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    bio: "Store administrator managing the XALCO commerce platform. Responsible for inventory, sales, and team coordination.",
    role: "Administrator",
    joinDate: "Jan 15, 2024",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <PageShell title="My Profile" subtitle="Manage your account information and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 rounded-2xl xalco-shadow border-border/50">
          <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
            <div className="relative group mb-5">
              <div className="w-28 h-28 rounded-full bg-accent/10 flex items-center justify-center ring-4 ring-accent/20">
                <User className="h-12 w-12 text-accent" />
              </div>
              <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center xalco-shadow-sm hover:bg-accent/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">{profile.email}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
              <Shield className="h-3 w-3" />
              {profile.role}
            </span>
            <p className="text-xs text-muted-foreground mt-4">
              Member since {profile.joinDate}
            </p>

            <Separator className="my-6" />

            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {profile.city}, {profile.state}
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Edit Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="rounded-2xl xalco-shadow border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                className={isEditing ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-1.5" /> Save Changes
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-1.5" /> Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">First Name</Label>
                  <Input
                    value={profile.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    disabled={!isEditing}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Last Name</Label>
                  <Input
                    value={profile.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    disabled={!isEditing}
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Email Address</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Phone Number</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Bio</Label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="resize-none"
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-1">
                  <Label className="text-xs font-medium text-muted-foreground">Address</Label>
                  <Input
                    value={profile.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">City</Label>
                  <Input
                    value={profile.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    disabled={!isEditing}
                    className="h-10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">State</Label>
                    <Input
                      value={profile.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      disabled={!isEditing}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">ZIP</Label>
                    <Input
                      value={profile.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      disabled={!isEditing}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="rounded-2xl xalco-shadow border-border/50 hover:border-accent/30 transition-colors cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <Key className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Change Password</h4>
                  <p className="text-xs text-muted-foreground">Update your security credentials</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl xalco-shadow border-border/50 hover:border-accent/30 transition-colors cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-info/10 flex items-center justify-center group-hover:bg-info/15 transition-colors">
                  <Bell className="h-5 w-5 text-info" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
                  <p className="text-xs text-muted-foreground">Manage alerts and email preferences</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ProfilePage;
