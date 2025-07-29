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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Intern } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserX } from 'lucide-react';

interface RejectInternModalProps {
  intern: Intern;
  onClose: () => void;
}

const RejectInternModal: React.FC<RejectInternModalProps> = ({ intern, onClose }) => {
  const [remarks, setRemarks] = useState('');
  const [alternativeMentorId, setAlternativeMentorId] = useState('');
  const { mentors, rejectIntern } = useData();
  const { user } = useAuth();
  const { toast } = useToast();

  // Filter out the current mentor from alternatives
  const availableMentors = mentors.filter(mentor => mentor.id !== user?.id);

  const handleReject = () => {
    if (!remarks.trim()) {
      toast({
        title: "Error",
        description: "Please provide rejection remarks",
        variant: "destructive",
      });
      return;
    }

    const alternativeMentor = availableMentors.find(m => m.id === alternativeMentorId);
    
    rejectIntern(intern.id, remarks, alternativeMentor?.name || '');
    toast({
      title: "Intern Rejected",
      description: `${intern.name} has been rejected and sent back to HR`,
      variant: "destructive",
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserX className="w-5 h-5" />
            <span>Reject Intern</span>
          </DialogTitle>
          <DialogDescription>
            Provide rejection reasons and suggest an alternative mentor
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

          {/* Rejection Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Rejection Remarks *</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4}
              placeholder="Please provide specific reasons for rejection..."
              required
            />
            <p className="text-sm text-muted-foreground">
              Be specific about why this intern is not suitable for your mentorship.
            </p>
          </div>

          {/* Alternative Mentor */}
          <div className="space-y-2">
            <Label htmlFor="altMentor">Suggest Alternative Mentor (Optional)</Label>
            <Select value={alternativeMentorId} onValueChange={setAlternativeMentorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a mentor who might be a better fit..." />
              </SelectTrigger>
              <SelectContent>
                {availableMentors.map((mentor) => (
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
            <p className="text-sm text-muted-foreground">
              Suggest a mentor whose expertise better matches the intern's background.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject} 
              disabled={!remarks.trim()}
            >
              <UserX className="w-4 h-4 mr-2" />
              Reject Intern
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectInternModal;