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

function CreateCRM() {
  const [userId, setUserId] = useState('');
  const [interactionType, setInteractionType] = useState('CALL');
  const [interactionDetails, setInteractionDetails] = useState('');
  const [subject, setSubject] = useState('');
  const [outcome, setOutcome] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const crmData = {
        userId: parseInt(userId),
        interactionType: interactionType as any,
        interactionDetails: interactionDetails || null,
        subject: subject || null,
        outcome: outcome || null
      };

      await axios.post('/api/crm', crmData);
      navigate('/crm');
    } catch (error: any) {
      console.error('Error creating CRM interaction:', error);
      alert('Error creating CRM interaction: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Log CRM Interaction</h1>
        <Link to="/crm" className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Interaction Type</FormLabel>
              <FormControl>
                <Select value={interactionType} onValueChange={setInteractionType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CALL">Call</SelectItem>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="CHAT">Chat</SelectItem>
                    <SelectItem value="MEETING">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Interaction Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter interaction details"
                  value={interactionDetails}
                  onChange={(e) => setInteractionDetails(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Outcome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter outcome"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Logging...' : 'Log Interaction'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default CreateCRM;

