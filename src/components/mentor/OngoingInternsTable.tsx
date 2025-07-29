import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Intern } from '@/types';
import { Clock, Eye, CheckCircle } from 'lucide-react';
import InternDetailsModal from '../hr/InternDetailsModal';
import CompleteInternshipModal from './CompleteInternshipModal';

const OngoingInternsTable = () => {
  const { interns } = useData();
  const { user } = useAuth();
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [modalType, setModalType] = useState<'view' | 'complete' | null>(null);

  // Filter ongoing interns for this mentor
  const ongoingInterns = interns.filter(intern => 
    intern.status === 'ongoing' && intern.mentorId === user?.id
  );

  const handleAction = (intern: Intern, action: 'view' | 'complete') => {
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
            <Clock className="w-5 h-5" />
            <span>Ongoing Internships</span>
            <Badge variant="outline">{ongoingInterns.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ongoingInterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No ongoing internships at this time
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Intern ID</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">College</th>
                    <th className="text-left py-3 px-2">Project</th>
                    <th className="text-left py-3 px-2">Start Date</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ongoingInterns.map((intern) => (
                    <tr key={intern.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-mono text-sm">{intern.id}</td>
                      <td className="py-3 px-2 font-medium">{intern.name}</td>
                      <td className="py-3 px-2">{intern.college}</td>
                      <td className="py-3 px-2">{intern.project || 'Not assigned'}</td>
                      <td className="py-3 px-2 text-sm">
                        {intern.updatedAt.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(intern, 'view')}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAction(intern, 'complete')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {modalType === 'view' && selectedIntern && (
        <InternDetailsModal intern={selectedIntern} onClose={closeModal} />
      )}

      {modalType === 'complete' && selectedIntern && (
        <CompleteInternshipModal intern={selectedIntern} onClose={closeModal} />
      )}
    </>
  );
};

export default OngoingInternsTable;