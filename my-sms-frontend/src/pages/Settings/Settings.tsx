import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Key,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Badge } from "../../components/ui/badge";

export default function Settings() {
  const [settings, setSettings] = useState({
    // Profile Settings
    username: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    ticketUpdates: true,
    taskAssignments: true,
    slaAlerts: true,
    weeklyReports: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    
    // Appearance Settings
    theme: "light",
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    
    // Application Settings
    itemsPerPage: "10",
    autoRefresh: true,
    refreshInterval: "30",
    showTooltips: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving settings:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h1 text-text-primary">Settings</h1>
          <p className="text-body text-text-small mt-1">Manage your account settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="btn-primary">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {saved && (
        <div className="p-4 bg-success-bg border border-success rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <span className="text-body text-success font-medium">Settings saved successfully!</span>
        </div>
      )}

      {/* Profile Settings */}
      <Card className="card-stratum">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-text-secondary" />
            <CardTitle className="text-h2">Profile Settings</CardTitle>
          </div>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="input-stratum"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="input-stratum"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="input-stratum"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="role"
                  value={settings.role}
                  disabled
                  className="input-stratum"
                />
                <Badge variant="info">{settings.role}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="card-stratum">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-text-secondary" />
            <CardTitle className="text-h2">Notification Preferences</CardTitle>
          </div>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-small text-text-small">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleChange("emailNotifications", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-small text-text-small">Receive browser push notifications</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleChange("pushNotifications", checked)}
            />
          </div>
          <Separator />
          <div className="space-y-3">
            <Label>Notification Types</Label>
            <div className="space-y-3 pl-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ticket-updates" className="font-normal">Ticket Updates</Label>
                <Switch
                  id="ticket-updates"
                  checked={settings.ticketUpdates}
                  onCheckedChange={(checked) => handleChange("ticketUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="task-assignments" className="font-normal">Task Assignments</Label>
                <Switch
                  id="task-assignments"
                  checked={settings.taskAssignments}
                  onCheckedChange={(checked) => handleChange("taskAssignments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sla-alerts" className="font-normal">SLA Alerts</Label>
                <Switch
                  id="sla-alerts"
                  checked={settings.slaAlerts}
                  onCheckedChange={(checked) => handleChange("slaAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports" className="font-normal">Weekly Reports</Label>
                <Switch
                  id="weekly-reports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleChange("weeklyReports", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="card-stratum">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-text-secondary" />
            <CardTitle className="text-h2">Security Settings</CardTitle>
          </div>
          <CardDescription>Manage your account security and privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-small text-text-small">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleChange("twoFactorAuth", checked)}
            />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Select
                value={settings.sessionTimeout}
                onValueChange={(value) => handleChange("sessionTimeout", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Select
                value={settings.passwordExpiry}
                onValueChange={(value) => handleChange("passwordExpiry", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button variant="outline" className="btn-secondary">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="btn-secondary">
              <Mail className="mr-2 h-4 w-4" />
              View Login History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="card-stratum">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-text-secondary" />
            <CardTitle className="text-h2">Appearance & Localization</CardTitle>
          </div>
          <CardDescription>Customize the look and feel of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => handleChange("theme", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleChange("language", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => handleChange("timezone", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select
                value={settings.dateFormat}
                onValueChange={(value) => handleChange("dateFormat", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format</Label>
              <Select
                value={settings.timeFormat}
                onValueChange={(value) => handleChange("timeFormat", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Settings */}
      <Card className="card-stratum">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-text-secondary" />
            <CardTitle className="text-h2">Application Settings</CardTitle>
          </div>
          <CardDescription>Configure application behavior and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="items-per-page">Items Per Page</Label>
              <Select
                value={settings.itemsPerPage}
                onValueChange={(value) => handleChange("itemsPerPage", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Auto Refresh Interval (seconds)</Label>
              <Select
                value={settings.refreshInterval}
                onValueChange={(value) => handleChange("refreshInterval", value)}
              >
                <SelectTrigger className="input-stratum">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-refresh">Auto Refresh</Label>
              <p className="text-small text-text-small">Automatically refresh data at specified interval</p>
            </div>
            <Switch
              id="auto-refresh"
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => handleChange("autoRefresh", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-tooltips">Show Tooltips</Label>
              <p className="text-small text-text-small">Display helpful tooltips throughout the application</p>
            </div>
            <Switch
              id="show-tooltips"
              checked={settings.showTooltips}
              onCheckedChange={(checked) => handleChange("showTooltips", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="card-stratum border-critical">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-critical" />
            <CardTitle className="text-h2 text-critical">Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-critical-bg rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-critical font-medium">Delete Account</Label>
              <p className="text-small text-text-small">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" className="bg-critical hover:bg-critical/90">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

