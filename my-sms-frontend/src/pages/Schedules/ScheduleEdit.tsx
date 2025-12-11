import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MoveLeft } from "lucide-react";
import axios from 'axios';
import { useForm } from 'react-hook-form';

function ScheduleEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [taskId, setTaskId] = useState('');
  const [technicianId, setTechnicianId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [status, setStatus] = useState('SCHEDULED');
  const [geoLocation, setGeoLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`/api/schedules/${id}`);
        const schedule = response.data;
        setTaskId(schedule.taskId?.toString() || '');
        setTechnicianId(schedule.technician?.id?.toString() || '');
        setScheduledDate(schedule.scheduledDate ? new Date(schedule.scheduledDate).toISOString().slice(0, 16) : '');
        setStatus(schedule.status || 'SCHEDULED');
        setGeoLocation(schedule.geoLocation || '');
        setNotes(schedule.notes || '');
      } catch (error: any) {
        console.error('Error fetching schedule:', error);
        alert('Error loading schedule: ' + (error.response?.data?.message || error.message));
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchSchedule();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const scheduleData = {
        taskId: parseInt(taskId),
        technician: {
          id: parseInt(technicianId)
        },
        scheduledDate: scheduledDate,
        status: status as any,
        geoLocation: geoLocation || null,
        notes: notes || null
      };

      await axios.put(`/api/schedules/${id}`, scheduleData);
      navigate(`/schedules/${id}`);
    } catch (error: any) {
      console.error('Error updating schedule:', error);
      alert('Error updating schedule: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="container mx-auto py-10">Loading schedule...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Edit Schedule</h1>
        <Link to={`/schedules/${id}`} className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>Task ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter task ID"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Technician ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter technician ID"
                  value={technicianId}
                  onChange={(e) => setTechnicianId(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
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
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
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
                  placeholder="Enter geo location"
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

            <div className="flex justify-end gap-2">
              <Link to={`/schedules/${id}`}>
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Schedule'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default ScheduleEdit;

