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

function TaskEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [dueDate, setDueDate] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        const task = response.data;
        setTicketId(task.ticketId?.toString() || '');
        setAssignedTo(task.assignedTo?.id?.toString() || '');
        setDescription(task.description || '');
        setStatus(task.status || 'PENDING');
        setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '');
        setApprovalStatus(task.approvalStatus || 'PENDING');
      } catch (error: any) {
        console.error('Error fetching task:', error);
        alert('Error loading task: ' + (error.response?.data?.message || error.message));
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        ticketId: parseInt(ticketId),
        assignedTo: {
          id: parseInt(assignedTo)
        },
        description,
        status: status as any,
        dueDate: dueDate || null,
        approvalStatus: approvalStatus as any
      };

      await axios.put(`/api/tasks/${id}`, taskData);
      navigate(`/tasks/${id}`);
    } catch (error: any) {
      console.error('Error updating task:', error);
      alert('Error updating task: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="container mx-auto py-10">Loading task...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Edit Task #{id}</h1>
        <Link to={`/tasks/${id}`} className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>Ticket ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter ticket ID"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Assigned To (User ID)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter user ID"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="ESCALATED">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Approval Status</FormLabel>
              <FormControl>
                <Select value={approvalStatus} onValueChange={setApprovalStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Approval Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end gap-2">
              <Link to={`/tasks/${id}`}>
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Task'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default TaskEdit;

