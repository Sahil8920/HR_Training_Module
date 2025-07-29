import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Intern } from '@/types';
import { UserPlus, UserX, Eye } from 'lucide-react';
import AcceptInternModal from './AcceptInternModal';
import RejectInternModal from './RejectInternModal';
import InternDetailsModal from '../hr/InternDetailsModal';

const NewInternsTable = () => {
  const { interns } = useData();
  const { user } = useAuth();
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [modalType, setModalType] = useState<'accept' | 'reject' | 'view' | null>(null);

  // Filter interns assigned to this mentor
  const assignedInterns = interns.filter(intern => 
    intern.status === 'assigned' && intern.mentorId === user?.id
  );

  const handleAction = (intern: Intern, action: 'accept' | 'reject' | 'view') => {
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
            <UserPlus className="w-5 h-5" />
            <span>New Interns Assigned to You</span>
            <Badge variant="outline">{assignedInterns.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {assignedInterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No new interns assigned to you at this time
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Intern ID</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">College</th>
                    <th className="text-left py-3 px-2">Qualification</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedInterns.map((intern) => (
                    <tr key={intern.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-mono text-sm">{intern.id}</td>
                      <td className="py-3 px-2 font-medium">{intern.name}</td>
                      <td className="py-3 px-2">{intern.college}</td>
                      <td className="py-3 px-2">{intern.qualification}</td>
                      <td className="py-3 px-2 text-sm">{intern.email}</td>
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
                            onClick={() => handleAction(intern, 'accept')}
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleAction(intern, 'reject')}
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Reject
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

      {modalType === 'accept' && selectedIntern && (
        <AcceptInternModal intern={selectedIntern} onClose={closeModal} />
      )}

      {modalType === 'reject' && selectedIntern && (
        <RejectInternModal intern={selectedIntern} onClose={closeModal} />
      )}

      {modalType === 'view' && selectedIntern && (
        <InternDetailsModal intern={selectedIntern} onClose={closeModal} />
      )}
    </>
  );
};

export default NewInternsTable;