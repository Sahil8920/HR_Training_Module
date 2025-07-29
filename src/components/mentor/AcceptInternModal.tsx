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
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Intern } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus } from 'lucide-react';

interface AcceptInternModalProps {
  intern: Intern;
  onClose: () => void;
}

const AcceptInternModal: React.FC<AcceptInternModalProps> = ({ intern, onClose }) => {
  const [project, setProject] = useState('');
  const { acceptIntern } = useData();
  const { toast } = useToast();

  const handleAccept = () => {
    if (!project.trim()) {
      toast({
        title: "Error",
        description: "Please assign a project to the intern",
        variant: "destructive",
      });
      return;
    }

    acceptIntern(intern.id, project);
    toast({
      title: "Intern Accepted Successfully",
      description: `${intern.name} has been accepted and assigned to project: ${project}`,
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Accept Intern</span>
          </DialogTitle>
          <DialogDescription>
            Accept the intern and assign them a project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Intern Details */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-3">Intern Details</h3>
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
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{intern.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">College</p>
                  <p className="font-medium">{intern.college}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Qualification</p>
                  <p className="font-medium">{intern.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Grades</p>
                  <p className="font-medium">{intern.grades}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  <p className="font-medium">{intern.mobile}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Assignment */}
          <div className="space-y-2">
            <Label htmlFor="project">Assign Project *</Label>
            <Input
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Enter project title/description..."
              required
            />
            <p className="text-sm text-muted-foreground">
              Provide a clear project title or brief description of what the intern will work on.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAccept} disabled={!project.trim()}>
              <UserPlus className="w-4 h-4 mr-2" />
              Accept & Assign Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptInternModal;