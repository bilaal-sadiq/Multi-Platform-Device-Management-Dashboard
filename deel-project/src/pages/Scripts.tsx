import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScriptModal } from "@/components/ScriptModal";
import { FileCode, Eye, Download, Play, CheckCircle2, XCircle, Clock } from "lucide-react";

interface Script {
  id: string;
  name: string;
  platform: "Windows" | "macOS" | "Both";
  description: string;
  lastModified: string;
  language: "PowerShell" | "Bash" | "Python";
  code: string;
}

const scripts: Script[] = [
  {
    id: "SCR001",
    name: "Windows Onboarding - Autopilot Setup",
    platform: "Windows",
    description: "Automated device enrollment and configuration for Windows 11 devices using Autopilot. Configures domain join, installs required software, and applies security policies.",
    lastModified: "2024-01-08",
    language: "PowerShell",
    code: `# Windows Autopilot Onboarding Script
# Configures new Windows 11 devices with enterprise settings

Write-Host "Starting Windows Autopilot Setup..." -ForegroundColor Green

# Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Force

# Install required modules
Install-PackageProvider -Name NuGet -Force
Install-Module -Name WindowsAutopilotIntune -Force

# Configure Windows Update settings
New-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" -Name NoAutoUpdate -Value 0 -PropertyType DWORD -Force

# Enable BitLocker encryption
Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -UsedSpaceOnly -SkipHardwareTest

# Configure Windows Defender
Set-MpPreference -DisableRealtimeMonitoring $false
Update-MpSignature

# Join Azure AD domain
Add-Computer -DomainName "corp.devicehub.com" -Credential $cred -Restart -Force

Write-Host "Autopilot setup completed successfully!" -ForegroundColor Green`,
  },
  {
    id: "SCR002",
    name: "macOS System Configuration",
    platform: "macOS",
    description: "Complete system setup for macOS devices including FileVault, firewall configuration, and essential application installation.",
    lastModified: "2024-01-07",
    language: "Bash",
    code: `#!/bin/bash
# macOS System Configuration Script
# Configures security and installs required applications

echo "Starting macOS configuration..."

# Enable FileVault disk encryption
sudo fdesetup enable

# Enable firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setloggingmode on

# Configure automatic updates
sudo softwareupdate --schedule on

# Install Rosetta 2 for M1/M2 Macs
/usr/sbin/softwareupdate --install-rosetta --agree-to-license

# Set computer name
sudo scutil --set ComputerName "MacBook-\${USER}"
sudo scutil --set LocalHostName "MacBook-\${USER}"

# Configure screen lock
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 0

echo "macOS configuration completed successfully!"`,
  },
  {
    id: "SCR003",
    name: "Security Compliance Checker - Windows",
    platform: "Windows",
    description: "Audits Windows devices for compliance with security policies including encryption, firewall, antivirus, and update status.",
    lastModified: "2024-01-09",
    language: "PowerShell",
    code: `# Windows Security Compliance Checker
# Validates device against security baseline

$complianceReport = @()

Write-Host "Running Security Compliance Check..." -ForegroundColor Cyan

# Check BitLocker encryption
$bitlockerStatus = Get-BitLockerVolume -MountPoint "C:"
if ($bitlockerStatus.ProtectionStatus -eq "On") {
    $complianceReport += "PASS: BitLocker encryption enabled"
} else {
    $complianceReport += "FAIL: BitLocker encryption disabled"
}

# Check Windows Defender status
$defenderStatus = Get-MpComputerStatus
if ($defenderStatus.RealTimeProtectionEnabled) {
    $complianceReport += "PASS: Windows Defender active"
} else {
    $complianceReport += "FAIL: Windows Defender disabled"
}

# Check firewall status
$firewallStatus = Get-NetFirewallProfile | Where-Object { $_.Enabled -eq $false }
if ($firewallStatus.Count -eq 0) {
    $complianceReport += "PASS: Firewall enabled on all profiles"
} else {
    $complianceReport += "FAIL: Firewall disabled on one or more profiles"
}

# Check Windows Update status
$updateStatus = (New-Object -ComObject Microsoft.Update.AutoUpdate).Settings.NotificationLevel
if ($updateStatus -eq 4) {
    $complianceReport += "PASS: Automatic updates enabled"
} else {
    $complianceReport += "FAIL: Automatic updates not properly configured"
}

# Output report
Write-Host "\\n=== COMPLIANCE REPORT ===" -ForegroundColor Yellow
$complianceReport | ForEach-Object { Write-Host $_ }`,
  },
  {
    id: "SCR004",
    name: "Security Compliance Checker - macOS",
    platform: "macOS",
    description: "Comprehensive security audit for macOS devices checking FileVault, firewall, Gatekeeper, and system updates.",
    lastModified: "2024-01-09",
    language: "Bash",
    code: `#!/bin/bash
# macOS Security Compliance Checker
# Validates device against security baseline

echo "Running Security Compliance Check..."
echo ""

# Check FileVault encryption
if fdesetup status | grep -q "On"; then
    echo "✓ PASS: FileVault encryption enabled"
else
    echo "✗ FAIL: FileVault encryption disabled"
fi

# Check firewall status
if /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate | grep -q "enabled"; then
    echo "✓ PASS: Firewall enabled"
else
    echo "✗ FAIL: Firewall disabled"
fi

# Check Gatekeeper status
if spctl --status | grep -q "enabled"; then
    echo "✓ PASS: Gatekeeper enabled"
else
    echo "✗ FAIL: Gatekeeper disabled"
fi

# Check automatic updates
AUTO_UPDATE=$(defaults read /Library/Preferences/com.apple.SoftwareUpdate AutomaticCheckEnabled)
if [ "$AUTO_UPDATE" = "1" ]; then
    echo "✓ PASS: Automatic updates enabled"
else
    echo "✗ FAIL: Automatic updates disabled"
fi

# Check screen lock settings
ASK_PASSWORD=$(defaults read com.apple.screensaver askForPassword)
if [ "$ASK_PASSWORD" = "1" ]; then
    echo "✓ PASS: Screen lock password required"
else
    echo "✗ FAIL: Screen lock not configured"
fi

echo ""
echo "=== Compliance check completed ==="`,
  },
  {
    id: "SCR005",
    name: "Application Mass Deployment",
    platform: "Both",
    description: "Deploy multiple applications silently across Windows and macOS devices. Supports custom package lists and error handling.",
    lastModified: "2024-01-06",
    language: "PowerShell",
    code: `# Application Mass Deployment Script
# Deploys multiple applications based on device platform

param(
    [string[]]$Applications = @("Chrome", "Slack", "Zoom", "Office365")
)

Write-Host "Starting Application Deployment..." -ForegroundColor Green

$deploymentResults = @()

foreach ($app in $Applications) {
    Write-Host "Deploying $app..." -ForegroundColor Cyan
    
    try {
        # Check if Windows or macOS
        if ($IsWindows) {
            winget install --id $app --silent --accept-source-agreements
        } else {
            brew install --cask $app
        }
        
        $deploymentResults += "SUCCESS: $app installed"
        Write-Host "✓ $app installed successfully" -ForegroundColor Green
    }
    catch {
        $deploymentResults += "FAILED: $app - $($_.Exception.Message)"
        Write-Host "✗ $app installation failed" -ForegroundColor Red
    }
}

Write-Host "\\n=== DEPLOYMENT SUMMARY ===" -ForegroundColor Yellow
$deploymentResults | ForEach-Object { Write-Host $_ }`,
  },
  {
    id: "SCR006",
    name: "User Account Setup Automation",
    platform: "Both",
    description: "Automated user account provisioning with proper permissions, group memberships, and profile configuration.",
    lastModified: "2024-01-05",
    language: "PowerShell",
    code: `# User Account Setup Automation
# Creates and configures user accounts with standard permissions

param(
    [string]$Username,
    [string]$FullName,
    [string]$Department,
    [string[]]$Groups = @("Domain Users")
)

Write-Host "Creating user account for $FullName..." -ForegroundColor Green

# Generate secure random password
Add-Type -AssemblyName System.Web
$password = [System.Web.Security.Membership]::GeneratePassword(16, 4)

try {
    # Create user account
    New-ADUser -Name $FullName \`
        -GivenName $FullName.Split()[0] \`
        -Surname $FullName.Split()[1] \`
        -SamAccountName $Username \`
        -UserPrincipalName "$Username@corp.devicehub.com" \`
        -Department $Department \`
        -AccountPassword (ConvertTo-SecureString $password -AsPlainText -Force) \`
        -Enabled $true \`
        -ChangePasswordAtLogon $true

    # Add to groups
    foreach ($group in $Groups) {
        Add-ADGroupMember -Identity $group -Members $Username
    }

    Write-Host "✓ User account created successfully!" -ForegroundColor Green
    Write-Host "Temporary Password: $password" -ForegroundColor Yellow
    Write-Host "User must change password at first login" -ForegroundColor Yellow
}
catch {
    Write-Host "✗ Failed to create user account: $($_.Exception.Message)" -ForegroundColor Red
}`,
  },
];

const executionHistory = [
  {
    id: "EXE001",
    scriptName: "Security Compliance Checker - Windows",
    targetDevices: "12 devices",
    executedBy: "Admin User",
    timestamp: "2024-01-10 14:30",
    result: "Success",
  },
  {
    id: "EXE002",
    scriptName: "macOS System Configuration",
    targetDevices: "5 devices",
    executedBy: "IT Support",
    timestamp: "2024-01-10 11:15",
    result: "Success",
  },
  {
    id: "EXE003",
    scriptName: "Application Mass Deployment",
    targetDevices: "25 devices",
    executedBy: "Admin User",
    timestamp: "2024-01-09 16:45",
    result: "Partial",
  },
  {
    id: "EXE004",
    scriptName: "Windows Onboarding - Autopilot Setup",
    targetDevices: "3 devices",
    executedBy: "IT Support",
    timestamp: "2024-01-09 09:20",
    result: "Success",
  },
];

export default function Scripts() {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Windows":
        return "bg-primary/10 text-primary border-primary/20";
      case "macOS":
        return "bg-muted text-muted-foreground border-border";
      case "Both":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getLanguageBadge = (language: string) => {
    const colors: Record<string, string> = {
      PowerShell: "bg-primary/10 text-primary border-primary/20",
      Bash: "bg-success/10 text-success border-success/20",
      Python: "bg-warning/10 text-warning border-warning/20",
    };
    return colors[language] || "bg-muted text-muted-foreground border-border";
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Scripts & Automation</h1>
            <p className="text-muted-foreground">Manage and execute automation scripts across your fleet</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <FileCode className="w-4 h-4 mr-2" />
            New Script
          </Button>
        </div>

        {/* Script Library */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Script Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scripts.map((script) => (
              <Card key={script.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <FileCode className="w-8 h-8 text-primary" />
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getPlatformColor(script.platform)}>
                        {script.platform}
                      </Badge>
                      <Badge variant="outline" className={getLanguageBadge(script.language)}>
                        {script.language}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{script.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {script.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {script.lastModified}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedScript(script)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      Run
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Execution History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Execution History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Script Name</TableHead>
                    <TableHead className="font-semibold">Target Devices</TableHead>
                    <TableHead className="font-semibold">Executed By</TableHead>
                    <TableHead className="font-semibold">Timestamp</TableHead>
                    <TableHead className="font-semibold">Result</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {executionHistory.map((execution) => (
                    <TableRow key={execution.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{execution.scriptName}</TableCell>
                      <TableCell>{execution.targetDevices}</TableCell>
                      <TableCell>{execution.executedBy}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{execution.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {execution.result === "Success" && (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <span className="text-success font-medium">Success</span>
                            </>
                          )}
                          {execution.result === "Partial" && (
                            <>
                              <XCircle className="w-4 h-4 text-warning" />
                              <span className="text-warning font-medium">Partial</span>
                            </>
                          )}
                          {execution.result === "Failed" && (
                            <>
                              <XCircle className="w-4 h-4 text-danger" />
                              <span className="text-danger font-medium">Failed</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Logs
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <ScriptModal
        script={selectedScript}
        onClose={() => setSelectedScript(null)}
      />
    </Layout>
  );
}
