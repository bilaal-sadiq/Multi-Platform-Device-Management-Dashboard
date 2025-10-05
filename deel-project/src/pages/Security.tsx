import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { devices } from "@/lib/mockData";
import { Shield, Lock, Activity, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";

export default function Security() {
  const totalDevices = devices.length;
  const compliantDevices = devices.filter(d => d.compliance === "Compliant").length;
  const complianceScore = Math.round((compliantDevices / totalDevices) * 100);
  
  const nonCompliantDevices = devices.filter(d => d.compliance === "Non-Compliant");

  const securityPolicies = [
    {
      name: "Password Requirements",
      description: "Minimum 12 characters, complexity required",
      enabled: true,
      category: "Authentication",
    },
    {
      name: "Disk Encryption Required",
      description: "FileVault/BitLocker must be enabled",
      enabled: true,
      category: "Data Protection",
    },
    {
      name: "Automatic OS Updates",
      description: "Install security updates within 7 days",
      enabled: true,
      category: "Updates",
    },
    {
      name: "Firewall Enforcement",
      description: "System firewall must be enabled",
      enabled: true,
      category: "Network Security",
    },
    {
      name: "Antivirus Protection",
      description: "Enterprise AV solution required",
      enabled: true,
      category: "Malware Protection",
    },
    {
      name: "Screen Lock Timeout",
      description: "Auto-lock after 10 minutes of inactivity",
      enabled: true,
      category: "Physical Security",
    },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Security & Compliance</h1>
          <p className="text-muted-foreground">Monitor security posture and enforce policies</p>
        </div>

        {/* Compliance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Overall Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-5xl font-bold text-primary">{complianceScore}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {compliantDevices} of {totalDevices} devices compliant
                  </p>
                </div>
                <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-primary" />
                </div>
              </div>
              <Progress value={complianceScore} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Encryption</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {devices.filter(d => d.encryption).length}/{totalDevices}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Firewall</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {devices.filter(d => d.firewall).length}/{totalDevices}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span className="font-semibold text-warning">Antivirus</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {devices.filter(d => d.antivirus).length}/{totalDevices}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityPolicies.map((policy, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{policy.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {policy.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={policy.enabled} />
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Non-Compliant Devices */}
        {nonCompliantDevices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-danger" />
                Non-Compliant Devices Requiring Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nonCompliantDevices.map((device) => (
                  <div 
                    key={device.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-danger/20 bg-danger/5"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium text-foreground">{device.name}</p>
                        <span className="text-sm text-muted-foreground">{device.user}</span>
                        <StatusBadge status={device.compliance} type="compliance" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {!device.encryption && (
                          <Badge variant="destructive" className="text-xs">
                            <XCircle className="w-3 h-3 mr-1" />
                            No Encryption
                          </Badge>
                        )}
                        {!device.firewall && (
                          <Badge variant="destructive" className="text-xs">
                            <XCircle className="w-3 h-3 mr-1" />
                            Firewall Off
                          </Badge>
                        )}
                        {!device.antivirus && (
                          <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            No Antivirus
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remediate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
