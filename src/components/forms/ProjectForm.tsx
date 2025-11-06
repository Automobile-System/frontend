import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProjects } from "@/hooks/useProjects";
import { NewProject } from "@/hooks/useProjects";
import { useServices } from "@/hooks/useServices";
import { useState } from "react";

export function ProjectForm({ onSuccess }: { onSuccess?: () => void }) {
  const { createProject } = useProjects();
  const { data: serviceTypes } = useServices();
  const [tasks, setTasks] = useState<Array<{ name: string, type: string }>>([]);
  
  const form = useForm<NewProject>();
  const { register, handleSubmit, reset } = form;

  const onSubmit = async (data: NewProject) => {
    try {
      await createProject({
        ...data,
        tasks: tasks.map((t, i) => ({
          id: `new-${i}`,
          name: t.name,
          status: 'pending'
        }))
      });
      reset();
      setTasks([]);
      toast.success('Project created');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const addTask = () => {
    setTasks([...tasks, { name: '', type: '' }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: string, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                {...register('name', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Project description"
                {...register('description', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tasks</Label>
              {tasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Task name"
                    value={task.name}
                    onChange={e => updateTask(index, 'name', e.target.value)}
                  />
                  <select 
                    className="border rounded px-2"
                    value={task.type}
                    onChange={e => updateTask(index, 'type', e.target.value)}
                  >
                    <option value="">Select type</option>
                    {serviceTypes?.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <Button 
                    type="button" 
                    variant="destructive"
                    onClick={() => removeTask(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addTask}>
                Add Task
              </Button>
            </div>

            <CardFooter className="flex justify-end gap-2 px-0">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}