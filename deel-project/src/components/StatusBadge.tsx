import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type?: "device" | "compliance" | "priority" | "ticket";
}

export function StatusBadge({ status, type = "device" }: StatusBadgeProps) {
  const getVariant = () => {
    if (type === "device") {
      switch (status) {
        case "Active":
          return "bg-success/10 text-success border-success/20";
        case "Offline":
          return "bg-muted text-muted-foreground border-border";
        case "Pending Setup":
          return "bg-warning/10 text-warning border-warning/20";
        case "Needs Attention":
          return "bg-danger/10 text-danger border-danger/20";
        default:
          return "bg-muted text-muted-foreground border-border";
      }
    }
    
    if (type === "compliance") {
      switch (status) {
        case "Compliant":
          return "bg-success/10 text-success border-success/20";
        case "Non-Compliant":
          return "bg-danger/10 text-danger border-danger/20";
        case "Warning":
          return "bg-warning/10 text-warning border-warning/20";
        default:
          return "bg-muted text-muted-foreground border-border";
      }
    }
    
    if (type === "priority") {
      switch (status) {
        case "Urgent":
          return "bg-danger/10 text-danger border-danger/20";
        case "High":
          return "bg-warning/10 text-warning border-warning/20";
        case "Normal":
          return "bg-primary/10 text-primary border-primary/20";
        case "Low":
          return "bg-muted text-muted-foreground border-border";
        default:
          return "bg-muted text-muted-foreground border-border";
      }
    }
    
    if (type === "ticket") {
      switch (status) {
        case "New":
          return "bg-primary/10 text-primary border-primary/20";
        case "In Progress":
          return "bg-warning/10 text-warning border-warning/20";
        case "Waiting":
          return "bg-muted text-muted-foreground border-border";
        case "Resolved":
          return "bg-success/10 text-success border-success/20";
        default:
          return "bg-muted text-muted-foreground border-border";
      }
    }
    
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <Badge variant="outline" className={cn("font-medium border", getVariant())}>
      {status}
    </Badge>
  );
}
