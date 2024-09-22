import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

function FormArea() {
  const users = [
    { id: 1, name: "Manav" },
    { id: 2, name: "Rupesh" },
    { id: 4, name: "Swaraj" },
    { id: 3, name: "Vikas" },
  ];

  

  return (
    <form className="flex flex-col gap-2">
      <Select >
        <SelectTrigger className="text-black">
          <SelectValue placeholder="Select Yourself" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="What is the Item?" name="itemName" />
      <Input placeholder="What is the Item's Price?" name="itemPrice" />
      <Button>
        Add item
      </Button>
    </form>
  );
}

export default FormArea;
