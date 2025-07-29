import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Intern } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface InternDetailsModalProps {
  intern: Intern;
  onClose: () => void;
}

const InternDetailsModal: React.FC<InternDetailsModalProps> = ({ intern, onClose }) => {
  const getStatusBadge = (status: Intern['status']) => {
    const variants = {
      new: 'secondary',
      assigned: 'info',
      accepted: 'info',
      rejected: 'destructive',
      ongoing: 'warning',
      completed: 'success'
    } as const;

    return (
      <Badge variant={variants[status] as any}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Intern Details</DialogTitle>
          <DialogDescription>
            Complete information about the intern
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Photo and Basic Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={intern.photo} />
                  <AvatarFallback className="text-lg">{intern.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{intern.name}</h2>
                    {getStatusBadge(intern.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{intern.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile</p>
                      <p className="font-medium">{intern.mobile}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{intern.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aadhaar</p>
                      <p className="font-medium font-mono">{intern.aadhaar}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Educational Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Educational Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">College/University</p>
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
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{intern.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Internship Information */}
          {(intern.assignedMentor || intern.project) && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Internship Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {intern.assignedMentor && (
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Mentor</p>
                      <p className="font-medium">{intern.assignedMentor}</p>
                    </div>
                  )}
                  {intern.project && (
                    <div>
                      <p className="text-sm text-muted-foreground">Project</p>
                      <p className="font-medium">{intern.project}</p>
                    </div>
                  )}
                  {intern.attendance !== undefined && (
                    <div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                      <p className="font-medium">{intern.attendance}%</p>
                    </div>
                  )}
                  {intern.projectReportSubmitted !== undefined && (
                    <div>
                      <p className="text-sm text-muted-foreground">Project Report</p>
                      <Badge variant={intern.projectReportSubmitted ? 'success' : 'destructive'}>
                        {intern.projectReportSubmitted ? 'Submitted' : 'Not Submitted'}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Remarks and Comments */}
          {(intern.rejectionRemarks || intern.mentorRemarks || intern.hrRemarks) && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Remarks & Comments</h3>
                <div className="space-y-4">
                  {intern.rejectionRemarks && (
                    <div>
                      <p className="text-sm text-muted-foreground">Rejection Remarks</p>
                      <p className="font-medium text-destructive">{intern.rejectionRemarks}</p>
                      {intern.alternativeMentor && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Alternative Mentor: <span className="font-medium">{intern.alternativeMentor}</span>
                        </p>
                      )}
                    </div>
                  )}
                  {intern.mentorRemarks && (
                    <div>
                      <p className="text-sm text-muted-foreground">Mentor Remarks</p>
                      <p className="font-medium">{intern.mentorRemarks}</p>
                    </div>
                  )}
                  {intern.hrRemarks && (
                    <div>
                      <p className="text-sm text-muted-foreground">HR Remarks</p>
                      <p className="font-medium">{intern.hrRemarks}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InternDetailsModal;