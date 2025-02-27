import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { X } from 'lucide-react';
// import { Textarea } from "@shadcn/ui";


const TaskModals = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');
  
  const handleAddTask = () => {
    // Add task logic here
    setAddModalOpen(false);
    resetForm();
  };

  const handleEditTask = () => {
    // Edit task logic here
    setEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTaskTitle('');
    setTimeOfDay('');
    setPriority('');
    setNotes('');
  };

  return (
    <div>
      {/* Add Task Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Add New Task</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setAddModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Create a new task with title, priority, and optional notes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Task title..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            
            <Select value={timeOfDay} onValueChange={setTimeOfDay}>
              <SelectTrigger>
                <SelectValue placeholder="Morning" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <textarea
                placeholder="Additional notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-md border p-2 text-sm"
                />


            <Button className="w-full bg-black text-white" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Edit Task</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setEditModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Modify the task details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <Input
              value="Morning workout routine"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            
            <Select defaultValue="morning">
              <SelectTrigger>
                <SelectValue placeholder="Morning" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              value="30 minutes cardio + 20 minutes strength training"
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-black text-white" onClick={handleEditTask}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Task Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Task Details</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setViewModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm text-gray-500">Title</h4>
              <p className="text-base">Morning workout routine</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Time of Day</h4>
              <p className="text-base">Morning</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Priority</h4>
              <div className="flex items-center">
                <span className="text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full">
                  high
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Notes</h4>
              <p className="text-base">30 minutes cardio + 20 minutes strength training</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Status</h4>
              <p className="text-base">Pending</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Example trigger buttons */}
      <div className="flex space-x-4">
        <Button onClick={() => setAddModalOpen(true)}>Add Task</Button>
        <Button onClick={() => setEditModalOpen(true)}>Edit Task</Button>
        <Button onClick={() => setViewModalOpen(true)}>View Task</Button>
      </div>
    </div>
  );
};

export default TaskModals;