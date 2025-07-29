import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewInternsTable from './NewInternsTable';
import OngoingInternsTable from './OngoingInternsTable';
import CompletedInternsTable from './CompletedInternsTable';
import { UserPlus, Clock, Award } from 'lucide-react';

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState('new-interns');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground">Guide and evaluate your assigned interns</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new-interns" className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>New Interns</span>
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

        <TabsContent value="new-interns">
          <NewInternsTable />
        </TabsContent>

        <TabsContent value="ongoing">
          <OngoingInternsTable />
        </TabsContent>

        <TabsContent value="completed">
          <CompletedInternsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorDashboard;