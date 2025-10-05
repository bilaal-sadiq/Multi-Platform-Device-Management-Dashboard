import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Script {
  id: string;
  name: string;
  platform: string;
  description: string;
  lastModified: string;
  language: string;
  code: string;
}

interface ScriptModalProps {
  script: Script | null;
  onClose: () => void;
}

export function ScriptModal({ script, onClose }: ScriptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!script) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={!!script} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{script.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {script.platform}
            </Badge>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {script.language}
            </Badge>
            <span className="text-sm text-muted-foreground ml-auto">
              Last modified: {script.lastModified}
            </span>
          </div>

          <p className="text-muted-foreground">{script.description}</p>

          <div className="flex gap-2">
            <Button className="bg-primary hover:bg-primary-hover">
              <Play className="w-4 h-4 mr-2" />
              Execute Script
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg border border-border overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {script.language} Script
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {script.id}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-foreground font-mono leading-relaxed">
                {script.code}
              </code>
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
