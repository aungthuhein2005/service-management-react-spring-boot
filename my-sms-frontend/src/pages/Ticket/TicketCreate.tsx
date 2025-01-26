import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {useForm} from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { MoveLeft } from "lucide-react";
import axios from 'axios';
function CreateTicket() {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [assignee, setAssignee] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/technicians')
    .then(res => {
      console.log(res.data);
      setTechnicians(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])


  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Create New Ticket</h1>
        <Link to="/tickets" className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()} >
          <form action="" className='space-y-4'> 
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                id='description'
                name='description'
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Priority</FormLabel>
            <FormControl>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Assign To</FormLabel>
            <FormControl>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Assign To" />
                </SelectTrigger>
                <SelectContent>
                  {
                    technicians.map(technician => (
                      <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
            <div className="flex justify-end">
            <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default CreateTicket;
