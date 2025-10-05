import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { DeviceDetailModal } from "@/components/DeviceDetailModal";
import { devices } from "@/lib/mockData";
import { Search, Filter } from "lucide-react";

export default function Devices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [osFilter, setOsFilter] = useState<string>("all");
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = 
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || device.status === statusFilter;
    const matchesOS = osFilter === "all" || device.type === osFilter;
    
    return matchesSearch && matchesStatus && matchesOS;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Device Inventory</h1>
          <p className="text-muted-foreground">Manage and monitor all enrolled devices</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices, users, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Pending Setup">Pending Setup</SelectItem>
                  <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                </SelectContent>
              </Select>

              <Select value={osFilter} onValueChange={setOsFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Operating Systems" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Operating Systems</SelectItem>
                  <SelectItem value="macOS">macOS</SelectItem>
                  <SelectItem value="Windows">Windows</SelectItem>
                  <SelectItem value="iOS">iOS</SelectItem>
                  <SelectItem value="Android">Android</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Device Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {filteredDevices.length} Device{filteredDevices.length !== 1 ? "s" : ""}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Device Name</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Compliance</TableHead>
                    <TableHead className="font-semibold">Last Check-in</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{device.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{device.user}</TableCell>
                      <TableCell>
                        <StatusBadge status={device.status} type="device" />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={device.compliance} type="compliance" />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{device.lastCheckIn}</TableCell>
                      <TableCell className="text-sm">{device.location}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDevice(device.id)}
                        >
                          View Details
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

      <DeviceDetailModal
        deviceId={selectedDevice}
        onClose={() => setSelectedDevice(null)}
      />
    </Layout>
  );
}
