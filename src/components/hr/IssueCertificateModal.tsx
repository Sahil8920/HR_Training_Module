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
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Intern } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Award, Printer } from 'lucide-react';

interface IssueCertificateModalProps {
  intern: Intern;
  onClose: () => void;
}

const IssueCertificateModal: React.FC<IssueCertificateModalProps> = ({ intern, onClose }) => {
  const [hrRemarks, setHrRemarks] = useState('');
  const { issueCertificate } = useData();
  const { toast } = useToast();

  const handleIssue = () => {
    if (!hrRemarks.trim()) {
      toast({
        title: "Error",
        description: "Please add HR remarks before issuing the certificate",
        variant: "destructive",
      });
      return;
    }

    issueCertificate(intern.id, hrRemarks);
    toast({
      title: "Certificate Issued Successfully",
      description: `Certificate has been issued for ${intern.name}`,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handlePrint = () => {
    // Generate a simple certificate preview for printing
    const certificateContent = `
      <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: Arial, sans-serif; border: 3px solid #3b82f6;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #3b82f6; font-size: 36px; margin-bottom: 10px;">CERTIFICATE OF COMPLETION</h1>
          <p style="font-size: 18px; color: #666;">HR Training Module</p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <p style="font-size: 18px; margin-bottom: 20px;">This is to certify that</p>
          <h2 style="font-size: 32px; color: #1f2937; margin: 20px 0; text-decoration: underline;">${intern.name}</h2>
          <p style="font-size: 18px; margin-bottom: 20px;">has successfully completed the internship program</p>
          <p style="font-size: 16px; color: #666; margin-bottom: 10px;">Project: ${intern.project || 'N/A'}</p>
          <p style="font-size: 16px; color: #666; margin-bottom: 10px;">Mentor: ${intern.assignedMentor || 'N/A'}</p>
          <p style="font-size: 16px; color: #666; margin-bottom: 10px;">Attendance: ${intern.attendance || 'N/A'}%</p>
        </div>
        
        <div style="margin: 40px 0;">
          <h3 style="color: #3b82f6; margin-bottom: 10px;">HR Remarks:</h3>
          <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6;">${hrRemarks}</p>
        </div>
        
        <div style="margin: 40px 0;">
          <h3 style="color: #3b82f6; margin-bottom: 10px;">Mentor Remarks:</h3>
          <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6;">${intern.mentorRemarks || 'N/A'}</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-top: 60px;">
          <div style="text-align: center;">
            <div style="border-top: 2px solid #000; width: 200px; margin-bottom: 10px;"></div>
            <p style="font-weight: bold;">HR Manager</p>
            <p style="font-size: 14px; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 2px solid #000; width: 200px; margin-bottom: 10px;"></div>
            <p style="font-weight: bold;">Director</p>
            <p style="font-size: 14px; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Certificate - ${intern.name}</title>
            <style>
              @media print {
                body { margin: 0; }
                @page { margin: 1in; }
              }
            </style>
          </head>
          <body>
            ${certificateContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Issue Certificate</span>
          </DialogTitle>
          <DialogDescription>
            Issue completion certificate for the intern
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Intern Summary */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={intern.photo} />
                <AvatarFallback>{intern.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{intern.name}</h3>
                <p className="text-muted-foreground">{intern.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="success">COMPLETED</Badge>
                  {intern.projectReportSubmitted && (
                    <Badge variant="info">Report Submitted</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Internship Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Project</p>
              <p className="font-medium">{intern.project || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mentor</p>
              <p className="font-medium">{intern.assignedMentor || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attendance</p>
              <p className="font-medium">{intern.attendance || 'N/A'}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">
                {intern.createdAt.toLocaleDateString()} - {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Mentor Remarks */}
          <div>
            <Label>Mentor Remarks</Label>
            <div className="mt-1 p-3 bg-muted rounded-lg">
              <p className="text-sm">{intern.mentorRemarks || 'No mentor remarks available'}</p>
            </div>
          </div>

          {/* HR Remarks */}
          <div className="space-y-2">
            <Label htmlFor="hrRemarks">HR Final Remarks *</Label>
            <Textarea
              id="hrRemarks"
              value={hrRemarks}
              onChange={(e) => setHrRemarks(e.target.value)}
              rows={4}
              placeholder="Enter your final remarks about the intern's performance..."
              required
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrint} disabled={!hrRemarks.trim()}>
              <Printer className="w-4 h-4 mr-2" />
              Preview Certificate
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleIssue} disabled={!hrRemarks.trim()}>
                <Award className="w-4 h-4 mr-2" />
                Issue Certificate
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssueCertificateModal;