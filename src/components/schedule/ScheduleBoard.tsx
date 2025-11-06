import { useSchedule, ScheduleTask } from "@/hooks/useSchedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ScheduleBoard() {
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return {
      from: today.toISOString().split('T')[0],
      to: nextWeek.toISOString().split('T')[0]
    };
  });

  const { data: tasks, loading, error, autoBalance } = useSchedule(
    dateRange.from,
    dateRange.to
  );

  // Group tasks by employee
  const tasksByEmployee: Record<string, ScheduleTask[]> = {};
  tasks?.forEach(task => {
    if (!tasksByEmployee[task.employeeId]) {
      tasksByEmployee[task.employeeId] = [];
    }
    tasksByEmployee[task.employeeId].push(task);
  });

  if (loading) return <div>Loading schedule...</div>;
  if (error) return <div>Error loading schedule</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <input
            type="date"
            value={dateRange.from}
            onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            className="border rounded px-2 py-1"
          />
        </div>
        <Button onClick={autoBalance}>Auto-Balance</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(tasksByEmployee).map(([employeeId, employeeTasks]) => (
          <Card key={employeeId} className="relative">
            <CardHeader>
              <CardTitle>Employee {employeeId}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {employeeTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-2 border rounded cursor-move"
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('taskId', task.id);
                    }}
                  >
                    <div className="font-medium">{task.taskId}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(task.startTime).toLocaleTimeString()} - 
                      {new Date(task.endTime).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}