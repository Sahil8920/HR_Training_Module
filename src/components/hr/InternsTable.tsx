import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { Intern } from '@/types';
import { UserPlus, Eye, Award } from 'lucide-react';
import AssignMentorModal from './AssignMentorModal';
import InternDetailsModal from './InternDetailsModal';
import IssueCertificateModal from './IssueCertificateModal';

interface InternsTableProps {
  title: string;
  icon: React.ReactNode;
  status: Intern['status'] | Intern['status'][];
  showActions?: 'assign' | 'view' | 'certificate';
}

const InternsTable: React.FC<InternsTableProps> = ({ title, icon, status, showActions }) => {
  const { interns } = useData();
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [modalType, setModalType] = useState<'assign' | 'view' | 'certificate' | null>(null);

  const filteredInterns = interns.filter(intern => 
    Array.isArray(status) ? status.includes(intern.status) : intern.status === status
  );

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

  const handleAction = (intern: Intern, action: 'assign' | 'view' | 'certificate') => {
    setSelectedIntern(intern);
    setModalType(action);
  };

  const closeModal = () => {
    setSelectedIntern(null);
    setModalType(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {icon}
            <span>{title}</span>
            <Badge variant="outline">{filteredInterns.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No interns found in this category
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">ID</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">College</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Status</th>
                    {status === 'rejected' && <th className="text-left py-3 px-2">Rejection Remarks</th>}
                    {status === 'completed' && <th className="text-left py-3 px-2">Report Submitted</th>}
                    {showActions && <th className="text-left py-3 px-2">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredInterns.map((intern) => (
                    <tr key={intern.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-mono text-sm">{intern.id}</td>
                      <td className="py-3 px-2 font-medium">{intern.name}</td>
                      <td className="py-3 px-2">{intern.college}</td>
                      <td className="py-3 px-2 text-sm">{intern.email}</td>
                      <td className="py-3 px-2">{getStatusBadge(intern.status)}</td>
                      {status === 'rejected' && (
                        <td className="py-3 px-2 text-sm max-w-xs truncate">
                          {intern.rejectionRemarks}
                        </td>
                      )}
                      {status === 'completed' && (
                        <td className="py-3 px-2">
                          <Badge variant={intern.projectReportSubmitted ? 'success' : 'destructive'}>
                            {intern.projectReportSubmitted ? 'Yes' : 'No'}
                          </Badge>
                        </td>
                      )}
                      {showActions && (
                        <td className="py-3 px-2">
                          {showActions === 'assign' && (
                            <Button
                              size="sm"
                              onClick={() => handleAction(intern, 'assign')}
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Assign Mentor
                            </Button>
                          )}
                          {showActions === 'view' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(intern, 'view')}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          )}
                          {showActions === 'certificate' && (
                            <Button
                              size="sm"
                              disabled={intern.certificateIssued}
                              onClick={() => handleAction(intern, 'certificate')}
                            >
                              <Award className="w-4 h-4 mr-1" />
                              {intern.certificateIssued ? 'Issued' : 'Issue Certificate'}
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {modalType === 'assign' && selectedIntern && (
        <AssignMentorModal intern={selectedIntern} onClose={closeModal} />
      )}

      {modalType === 'view' && selectedIntern && (
        <InternDetailsModal intern={selectedIntern} onClose={closeModal} />
      )}

      {modalType === 'certificate' && selectedIntern && (
        <IssueCertificateModal intern={selectedIntern} onClose={closeModal} />
      )}
    </>
  );
};

export default InternsTable;