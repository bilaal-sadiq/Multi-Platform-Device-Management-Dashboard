import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { tickets } from "@/lib/mockData";
import { Ticket, Clock, CheckCircle2, Plus } from "lucide-react";

export default function Tickets() {
  const openTickets = tickets.filter(t => t.status !== "Resolved").length;
  const avgResponseTime = "2.5h";
  const resolvedToday = 7;
  const satisfaction = "94%";

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Support Tickets</h1>
            <p className="text-muted-foreground">Manage and track support requests</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Open Tickets"
            value={openTickets}
            icon={Ticket}
          />
          <MetricCard
            title="Avg Response Time"
            value={avgResponseTime}
            icon={Clock}
          />
          <MetricCard
            title="Resolved Today"
            value={resolvedToday}
            icon={CheckCircle2}
            trend={{ value: "+3 from yesterday", positive: true }}
          />
          <MetricCard
            title="Satisfaction Score"
            value={satisfaction}
            icon={CheckCircle2}
          />
        </div>

        {/* Ticket Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Ticket Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Ticket ID</TableHead>
                    <TableHead className="font-semibold">Subject</TableHead>
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Assigned To</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm font-medium">{ticket.id}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="font-medium truncate">{ticket.subject}</p>
                      </TableCell>
                      <TableCell>{ticket.user}</TableCell>
                      <TableCell>
                        <StatusBadge status={ticket.priority} type="priority" />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ticket.status} type="ticket" />
                      </TableCell>
                      <TableCell className="text-sm">{ticket.assignedTo}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{ticket.createdDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View
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
    </Layout>
  );
}
