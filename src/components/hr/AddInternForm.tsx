import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, User } from 'lucide-react';

const AddInternForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    mobile: '',
    email: '',
    qualification: '',
    grades: '',
    aadhaar: '',
    college: '',
    photo: ''
  });

  const { addIntern } = useData();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addIntern({
      ...formData,
      age: parseInt(formData.age),
      status: 'new'
    });

    toast({
      title: "Intern Added Successfully",
      description: `${formData.name} has been added to the system.`,
    });

    // Reset form
    setFormData({
      name: '',
      age: '',
      address: '',
      mobile: '',
      email: '',
      qualification: '',
      grades: '',
      aadhaar: '',
      college: '',
      photo: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Add New Intern</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-end">
            <div className="relative">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Intern photo"
                  className="w-24 h-24 rounded-lg object-cover border-2 border-border"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College/University *</Label>
              <Input
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Educational Qualification *</Label>
              <Input
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grades">Semester-wise Grades *</Label>
              <Input
                id="grades"
                name="grades"
                value={formData.grades}
                onChange={handleInputChange}
                placeholder="e.g., 8.5 CGPA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number *</Label>
              <Input
                id="aadhaar"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleInputChange}
                placeholder="1234-5678-9012"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-8">
              ADD INTERN
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInternForm;