
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";
import { useLibrary } from "@/contexts/LibraryContext";

// Password form schema
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

// Notification settings schema
const notificationSchema = z.object({
  emailNotifications: z.boolean().default(true),
  dueDateReminders: z.boolean().default(true),
  newArrivalsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

const SettingsPage = ({ isAdmin = false }) => {
  const { toast } = useToast();
  const { logout } = useLibrary();

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      dueDateReminders: true,
      newArrivalsNotifications: false,
      marketingEmails: false,
    },
  });

  function onPasswordSubmit(data: PasswordFormValues) {
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    passwordForm.reset();
  }

  function onNotificationSubmit(data: NotificationFormValues) {
    toast({
      title: "Settings updated",
      description: "Your notification settings have been updated successfully.",
    });
  }

  return (
    <DashboardLayout pageTitle="Settings" isAdmin={isAdmin}>
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Account Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions affect your entire account.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Export Your Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your data from LibTrack.
                      </p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data.
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">Session</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your active sessions.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Sign Out</h4>
                      <p className="text-sm text-muted-foreground">
                        Sign out from your current session.
                      </p>
                    </div>
                    <Button variant="outline" onClick={logout}>Sign Out</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Sign Out Everywhere</h4>
                      <p className="text-sm text-muted-foreground">
                        Sign out from all devices.
                      </p>
                    </div>
                    <Button variant="outline">Sign Out All</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Input type="password" className="pl-10" placeholder="••••••••" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Input type="password" className="pl-10" placeholder="••••••••" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Input type="password" className="pl-10" placeholder="••••••••" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Password must be at least 6 characters long.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Password</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose what notifications you receive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center space-x-2 rounded-lg border p-4">
                        <div>
                          <FormLabel className="font-semibold">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications about your account activity.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="dueDateReminders"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center space-x-2 rounded-lg border p-4">
                        <div>
                          <FormLabel className="font-semibold">Due Date Reminders</FormLabel>
                          <FormDescription>
                            Get notified when your books are due for return.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="newArrivalsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center space-x-2 rounded-lg border p-4">
                        <div>
                          <FormLabel className="font-semibold">New Book Arrivals</FormLabel>
                          <FormDescription>
                            Be notified when new books are added to the library.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center space-x-2 rounded-lg border p-4">
                        <div>
                          <FormLabel className="font-semibold">Marketing Emails</FormLabel>
                          <FormDescription>
                            Receive promotional emails and newsletters.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
