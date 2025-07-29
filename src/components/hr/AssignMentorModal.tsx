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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Intern } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AssignMentorModalProps {
  intern: Intern;
  onClose: () => void;
}

const AssignMentorModal: React.FC<AssignMentorModalProps> = ({ intern, onClose }) => {
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const { mentors, assignMentor } = useData();
  const { toast } = useToast();

  const handleAssign = () => {
    if (!selectedMentorId) return;

    const selectedMentor = mentors.find(m => m.id === selectedMentorId);
    if (selectedMentor) {
      assignMentor(intern.id, selectedMentorId, selectedMentor.name);
      toast({
        title: "Mentor Assigned Successfully",
        description: `${selectedMentor.name} has been assigned to ${intern.name}`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Mentor</DialogTitle>
          <DialogDescription>
            Select a mentor for this intern
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
              </div>
            </div>
          </div>

          {/* Mentor Selection */}
          <div className="space-y-2">
            <Label htmlFor="mentor">Select Mentor</Label>
            <Select value={selectedMentorId} onValueChange={setSelectedMentorId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a mentor..." />
              </SelectTrigger>
              <SelectContent>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{mentor.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {mentor.department} - {mentor.specialization}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedMentorId}>
              Assign Mentor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignMentorModal;