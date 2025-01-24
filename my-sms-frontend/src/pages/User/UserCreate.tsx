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

function UserCreate() {
  const { userId } = useParams<{ userId: string }>();
  const isEditing = Boolean(userId);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("role", data.role);
        })
        .catch((err) => console.log(err));
    }
  }, [userId, isEditing, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
    // Here, you'd send the data to your backend to either create or update the user.
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg">{isEditing ? "Update" : "Create"} User</h1>
        <Link to="/users" className="flex items-center">
          <MoveLeft /> Back
        </Link>
      </div>
      <Card className="p-4 mt-4">
        <Form {...useForm()}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    {...register("name", { required: "Name is required" })}
                  />
                </FormControl>
                <FormMessage>{errors.name?.message?.toString()}</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    {...register("email", { required: "Email is required" })}
                  />
                </FormControl>
                <FormMessage>{errors.email?.message?.toString()}</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
                <FormMessage>{errors.role?.message?.toString()}</FormMessage>
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

export default UserCreate;
