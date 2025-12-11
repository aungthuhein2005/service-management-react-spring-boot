import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MoveLeft } from "lucide-react";
import axios from 'axios';
import { useForm } from 'react-hook-form';

function CreateInvoice() {
  const [userId, setUserId] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const invoiceData = {
        userId: parseInt(userId),
        ticketId: ticketId ? parseInt(ticketId) : null,
        totalAmount: parseFloat(totalAmount),
        paymentMethod: paymentMethod as any,
        dueDate: dueDate || null
      };

      await axios.post('/api/invoices', invoiceData);
      navigate('/invoices');
    } catch (error: any) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Create New Invoice</h1>
        <Link to="/invoices" className='flex items-center'><MoveLeft /> back</Link>
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
              <FormLabel>Ticket ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter ticket ID"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter total amount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                    <SelectItem value="PAYPAL">PayPal</SelectItem>
                    <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                    <SelectItem value="CASH">Cash</SelectItem>
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

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Invoice'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default CreateInvoice;

