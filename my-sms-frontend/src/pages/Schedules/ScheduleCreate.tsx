import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MoveLeft } from "lucide-react";
import axios from 'axios';
import { useForm } from 'react-hook-form';

function CreateSchedule() {
  const [taskId, setTaskId] = useState('');
  const [technicianId, setTechnicianId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [status, setStatus] = useState('SCHEDULED');
  const [geoLocation, setGeoLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const scheduleData = {
        taskId: parseInt(taskId),
        technician: {
          id: parseInt(technicianId)
        },
        scheduledDate: scheduledDate || null,
        status: status as any,
        geoLocation: geoLocation || null,
        notes: notes || null
      };

      await axios.post('/api/schedules', scheduleData);
      navigate('/schedules');
    } catch (error: any) {
      console.error('Error creating schedule:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          error.message || 
                          'Failed to create schedule. Please ensure the Task ID and Technician ID exist.';
      alert('Error creating schedule: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Create New Schedule</h1>
        <Link to="/schedules" className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>Task ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter task ID (must exist)"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
              <p className="text-sm text-gray-500 mt-1">
                Note: The task must exist. <Link to="/tasks" className="text-blue-600 hover:underline">View existing tasks</Link> to get a valid Task ID.
              </p>
            </FormItem>

            <FormItem>
              <FormLabel>Technician ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter technician ID (must exist)"
                  value={technicianId}
                  onChange={(e) => setTechnicianId(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
              <p className="text-sm text-gray-500 mt-1">
                Note: The user must exist in the system. Use a valid User ID.
              </p>
            </FormItem>

            <FormItem>
              <FormLabel>Scheduled Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Geo Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location (e.g., lat,long)"
                  value={geoLocation}
                  onChange={(e) => setGeoLocation(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Schedule'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default CreateSchedule;

