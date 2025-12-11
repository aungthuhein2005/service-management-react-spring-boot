import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MoveLeft } from "lucide-react";
import axios from 'axios';
import { useForm } from 'react-hook-form';

function CreateInventory() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [restockThreshold, setRestockThreshold] = useState('5');
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inventoryData = {
        name,
        category: category || null,
        quantity: parseInt(quantity) || 0,
        restockThreshold: parseInt(restockThreshold) || 5,
        barcode: barcode || null,
        description: description || null,
        unitPrice: unitPrice ? parseFloat(unitPrice) : null
      };

      await axios.post('/api/inventory', inventoryData);
      navigate('/inventory');
    } catch (error: any) {
      console.error('Error creating inventory item:', error);
      alert('Error creating inventory item: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Add New Inventory Item</h1>
        <Link to="/inventory" className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter item name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Restock Threshold</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter restock threshold"
                  value={restockThreshold}
                  onChange={(e) => setRestockThreshold(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Unit Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter unit price"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Item'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default CreateInventory;

