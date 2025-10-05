import { devices } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { 
  Lock, 
  Trash2, 
  MessageSquare, 
  Download, 
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeviceDetailModalProps {
  deviceId: string | null;
  onClose: () => void;
}

export function DeviceDetailModal({ deviceId, onClose }: DeviceDetailModalProps) {
  const device = devices.find((d) => d.id === deviceId);

  if (!device) return null;

  return (
    <Dialog open={!!deviceId} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{device.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Device Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Device Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Device Name</p>
                <p className="font-medium">{device.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Serial Number</p>
                <p className="font-medium font-mono text-sm">{device.serialNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Model</p>
                <p className="font-medium">{device.model}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Operating System</p>
                <p className="font-medium">{device.osVersion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">User Assignment</p>
                <p className="font-medium">{device.user}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-medium">{device.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Check-in</p>
                <p className="font-medium">{device.lastCheckIn}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <StatusBadge status={device.status} type="device" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Security Status */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  {device.encryption ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger" />
                  )}
                  <span className="font-medium">Disk Encryption</span>
                </div>
                <Badge variant={device.encryption ? "outline" : "destructive"}>
                  {device.encryption ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  {device.firewall ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger" />
                  )}
                  <span className="font-medium">Firewall</span>
                </div>
                <Badge variant={device.firewall ? "outline" : "destructive"}>
                  {device.firewall ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  {device.antivirus ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger" />
                  )}
                  <span className="font-medium">Antivirus</span>
                </div>
                <Badge variant={device.antivirus ? "outline" : "destructive"}>
                  {device.antivirus ? "Protected" : "Not Protected"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Compliance</span>
                </div>
                <StatusBadge status={device.compliance} type="compliance" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Compliance Issues */}
          {device.compliance !== "Compliant" && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Compliance Issues
                </h3>
                <div className="space-y-2">
                  {!device.encryption && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-danger/20 bg-danger/5">
                      <XCircle className="w-5 h-5 text-danger flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Disk encryption not enabled</p>
                        <p className="text-sm text-muted-foreground">
                          Enable FileVault/BitLocker to secure data at rest
                        </p>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>
                  )}
                  {!device.firewall && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-danger/20 bg-danger/5">
                      <XCircle className="w-5 h-5 text-danger flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Firewall disabled</p>
                        <p className="text-sm text-muted-foreground">
                          Enable system firewall to protect against network threats
                        </p>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>
                  )}
                  {!device.antivirus && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-warning/20 bg-warning/5">
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Antivirus not installed</p>
                        <p className="text-sm text-muted-foreground">
                          Deploy enterprise antivirus solution
                        </p>
                      </div>
                      <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Remote Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Lock Device
              </Button>
              <Button variant="outline" className="justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Deploy App
              </Button>
              <Button variant="outline" className="justify-start text-danger hover:text-danger">
                <Trash2 className="w-4 h-4 mr-2" />
                Wipe Device
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
