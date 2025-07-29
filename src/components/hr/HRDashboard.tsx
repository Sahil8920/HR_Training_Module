import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddInternForm from './AddInternForm';
import InternsTable from './InternsTable';
import { UserPlus, Users, UserX, Clock, Award } from 'lucide-react';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('add-intern');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HR Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage interns and training programs</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="add-intern" className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Intern</span>
          </TabsTrigger>
          <TabsTrigger value="assign-mentor" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Assign Mentor</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center space-x-2">
            <UserX className="w-4 h-4" />
            <span>Rejected</span>
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Ongoing</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Completed</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add-intern">
          <AddInternForm />
        </TabsContent>

        <TabsContent value="assign-mentor">
          <InternsTable
            title="Assign Mentor to Interns"
            icon={<Users className="w-5 h-5" />}
            status="new"
            showActions="assign"
          />
        </TabsContent>

        <TabsContent value="rejected">
          <InternsTable
            title="Rejected by Mentor"
            icon={<UserX className="w-5 h-5" />}
            status="rejected"
            showActions="view"
          />
        </TabsContent>

        <TabsContent value="ongoing">
          <InternsTable
            title="Ongoing Internships"
            icon={<Clock className="w-5 h-5" />}
            status={['assigned', 'ongoing']}
            showActions="view"
          />
        </TabsContent>

        <TabsContent value="completed">
          <InternsTable
            title="Completed Internships"
            icon={<Award className="w-5 h-5" />}
            status="completed"
            showActions="certificate"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;