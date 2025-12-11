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

function CRMEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [interactionType, setInteractionType] = useState('CALL');
  const [subject, setSubject] = useState('');
  const [interactionDetails, setInteractionDetails] = useState('');
  const [outcome, setOutcome] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCRM = async () => {
      try {
        const response = await axios.get(`/api/crm/${id}`);
        const crm = response.data;
        setUserId(crm.userId?.toString() || '');
        setInteractionType(crm.interactionType || 'CALL');
        setSubject(crm.subject || '');
        setInteractionDetails(crm.interactionDetails || '');
        setOutcome(crm.outcome || '');
      } catch (error: any) {
        console.error('Error fetching CRM:', error);
        alert('Error loading CRM interaction: ' + (error.response?.data?.message || error.message));
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchCRM();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const crmData = {
        userId: parseInt(userId),
        interactionType: interactionType as any,
        subject: subject || null,
        interactionDetails: interactionDetails || null,
        outcome: outcome || null
      };

      await axios.put(`/api/crm/${id}`, crmData);
      navigate(`/crm/${id}`);
    } catch (error: any) {
      console.error('Error updating CRM:', error);
      alert('Error updating CRM interaction: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="container mx-auto py-10">Loading CRM interaction...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Edit CRM Interaction</h1>
        <Link to={`/crm/${id}`} className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>Customer ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter customer ID"
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

            <div className="flex justify-end gap-2">
              <Link to={`/crm/${id}`}>
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Interaction'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default CRMEdit;

