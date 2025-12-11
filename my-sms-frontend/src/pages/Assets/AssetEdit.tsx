import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MoveLeft } from "lucide-react";
import axios from 'axios';
import { useForm } from 'react-hook-form';

function AssetEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('AVAILABLE');
  const [location, setLocation] = useState('');
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState('');
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`/api/assets/${id}`);
        const asset = response.data;
        setName(asset.name || '');
        setSerialNumber(asset.serialNumber || '');
        setCategory(asset.category || '');
        setStatus(asset.status || 'AVAILABLE');
        setLocation(asset.location || '');
        setLastMaintenanceDate(asset.lastMaintenanceDate ? new Date(asset.lastMaintenanceDate).toISOString().slice(0, 16) : '');
        setNextMaintenanceDate(asset.nextMaintenanceDate ? new Date(asset.nextMaintenanceDate).toISOString().slice(0, 16) : '');
      } catch (error: any) {
        console.error('Error fetching asset:', error);
        alert('Error loading asset: ' + (error.response?.data?.message || error.message));
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchAsset();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const assetData = {
        name,
        serialNumber,
        category: category || null,
        status: status as any,
        location: location || null,
        lastMaintenanceDate: lastMaintenanceDate || null,
        nextMaintenanceDate: nextMaintenanceDate || null
      };

      await axios.put(`/api/assets/${id}`, assetData);
      navigate(`/assets/${id}`);
    } catch (error: any) {
      console.error('Error updating asset:', error);
      alert('Error updating asset: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="container mx-auto py-10">Loading asset...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-medium'>Edit Asset</h1>
        <Link to={`/assets/${id}`} className='flex items-center'><MoveLeft /> back</Link>
      </div>
      <Card className='p-4 mt-4'>
        <Form {...useForm()}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormItem>
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter asset name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter serial number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
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
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="IN_USE">In Use</SelectItem>
                    <SelectItem value="UNDER_MAINTENANCE">Under Maintenance</SelectItem>
                    <SelectItem value="RETIRED">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Last Maintenance Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={lastMaintenanceDate}
                  onChange={(e) => setLastMaintenanceDate(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Next Maintenance Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={nextMaintenanceDate}
                  onChange={(e) => setNextMaintenanceDate(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end gap-2">
              <Link to={`/assets/${id}`}>
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Asset'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default AssetEdit;

