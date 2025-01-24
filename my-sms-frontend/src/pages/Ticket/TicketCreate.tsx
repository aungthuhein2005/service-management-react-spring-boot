import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

function CreateTicket() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const isEditing = Boolean(ticketId);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      fetch(`api/ticketss/${ticketId}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("subject", data.subject);
          setValue("description", data.description);
          setValue("category", data.category);
          setValue("priority", data.priority);
          setValue("assignee", data.assignee);
        })
        .catch((err) => console.log(err));
    }
  }, [ticketId, isEditing, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg">{isEditing ? "Update" : "Create"} Ticket</h1>
        <Link to="/tickets" className="flex items-center">
          <MoveLeft /> Back
        </Link>
      </div>
      <Card className="p-4 mt-4">
      <Form {...useForm()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter subject"
                  {...register("subject", { required: "Subject is required" })}
                />
              </FormControl>
              <FormMessage>{errors.subject?.message?.toString()}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </FormControl>
              <FormMessage>{errors.description?.message?.toString()}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="category1">Category 1</SelectItem>
                        <SelectItem value="category2">Category 2</SelectItem>
                        <SelectItem value="category3">Category 3</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage>{errors.category?.message?.toString()}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage>{errors.priority?.message?.toString()}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Assign To</FormLabel>
              <FormControl>
                <Controller
                  name="assignee"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assignee1">Assignee 1</SelectItem>
                        <SelectItem value="assignee2">Assignee 2</SelectItem>
                        <SelectItem value="assignee3">Assignee 3</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage>{errors.assignee?.message?.toString()}</FormMessage>
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
        </Form>
      </Card>
    </div>
  );
}

export default CreateTicket;
