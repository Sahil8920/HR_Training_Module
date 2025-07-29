import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Intern } from '@/types';
import { Award, Eye } from 'lucide-react';
import InternDetailsModal from '../hr/InternDetailsModal';

const CompletedInternsTable = () => {
  const { interns } = useData();
  const { user } = useAuth();
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter completed interns for this mentor
  const completedInterns = interns.filter(intern => 
    intern.status === 'completed' && intern.mentorId === user?.id
  );

  const handleView = (intern: Intern) => {
    setSelectedIntern(intern);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedIntern(null);
    setShowModal(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Completed Internships</span>
            <Badge variant="outline">{completedInterns.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedInterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No completed internships yet
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
                    <th className="text-left py-3 px-2">Report Submitted</th>
                    <th className="text-left py-3 px-2">Attendance</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {completedInterns.map((intern) => (
                    <tr key={intern.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-mono text-sm">{intern.id}</td>
                      <td className="py-3 px-2 font-medium">{intern.name}</td>
                      <td className="py-3 px-2">{intern.college}</td>
                      <td className="py-3 px-2">{intern.project || 'N/A'}</td>
                      <td className="py-3 px-2">
                        <Badge variant={intern.projectReportSubmitted ? 'success' : 'destructive'}>
                          {intern.projectReportSubmitted ? 'Yes' : 'No'}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">{intern.attendance || 'N/A'}%</td>
                      <td className="py-3 px-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(intern)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && selectedIntern && (
        <InternDetailsModal intern={selectedIntern} onClose={closeModal} />
      )}
    </>
  );
};

export default CompletedInternsTable;