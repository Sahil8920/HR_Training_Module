import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Intern } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';

interface CompleteInternshipModalProps {
  intern: Intern;
  onClose: () => void;
}

const CompleteInternshipModal: React.FC<CompleteInternshipModalProps> = ({ intern, onClose }) => {
  const [remarks, setRemarks] = useState('');
  const [attendance, setAttendance] = useState('');
  const [projectReportSubmitted, setProjectReportSubmitted] = useState(false);
  const { completeInternship } = useData();
  const { toast } = useToast();

  const handleComplete = () => {
    if (!remarks.trim()) {
      toast({
        title: "Error",
        description: "Please provide mentor remarks",
        variant: "destructive",
      });
      return;
    }

    if (!attendance || isNaN(Number(attendance)) || Number(attendance) < 0 || Number(attendance) > 100) {
      toast({
        title: "Error",
        description: "Please provide a valid attendance percentage (0-100)",
        variant: "destructive",
      });
      return;
    }

    completeInternship(intern.id, remarks, Number(attendance), projectReportSubmitted);
    toast({
      title: "Internship Completed",
      description: `${intern.name}'s internship has been marked as completed`,
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Complete Internship</span>
          </DialogTitle>
          <DialogDescription>
            Finalize the internship and provide evaluation details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Intern Details */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-3">Intern Summary</h3>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={intern.photo} />
                <AvatarFallback>{intern.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{intern.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="font-medium">{intern.project}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {intern.updatedAt.toLocaleDateString()} - {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">College</p>
                  <p className="font-medium">{intern.college}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="remarks">Mentor Remarks *</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
                placeholder="Provide your evaluation of the intern's performance, skills demonstrated, and overall feedback..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendance">Attendance Percentage *</Label>
              <Input
                id="attendance"
                type="number"
                min="0"
                max="100"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                placeholder="e.g., 95"
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the overall attendance percentage (0-100)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="projectReport"
                checked={projectReportSubmitted}
                onCheckedChange={(checked) => setProjectReportSubmitted(checked as boolean)}
              />
              <Label htmlFor="projectReport" className="text-sm font-normal">
                Project report has been submitted by the intern
              </Label>
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h4 className="font-medium text-warning-foreground mb-2">Important Note</h4>
            <p className="text-sm text-warning-foreground">
              Once you mark this internship as completed, the intern will be moved to the completed section 
              and will be eligible for certificate issuance by HR.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleComplete} 
              disabled={!remarks.trim() || !attendance}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Internship
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteInternshipModal;