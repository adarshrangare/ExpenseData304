// app/page.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  DataSnapshot,
} from "firebase/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, TrendingUp, Users, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExpenseItem {
  ainputName: string;
  binputItem: string;
  cinputPrice: string;
}

interface Totals {
  total: number;
  swaraj: number;
  manav: number;
  //   rupesh: number;
  vikas: number;
  perPerson: number;
}

const NUMBER_OF_MEMBERS = 3;

const firebaseConfig = {
  databaseURL:
    "https://expensedata-91ef6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function ExpenseTracker(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [items, setItems] = useState<ExpenseItem[]>([]);
  const [error, setError] = useState<string>("");
  const [totals, setTotals] = useState<Totals>({
    total: 0,
    swaraj: 0,
    manav: 0,
    // rupesh: 0,
    vikas: 0,
    perPerson: 0,
  });

  useEffect(() => {
    const itemListInDB = ref(database, "itemList");
    onValue(itemListInDB, (snapshot: DataSnapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val()) as ExpenseItem[];
        setItems(data);
        calculateTotals(data);
      }
    });

    // Show warning for first 5 days of month
    const date = new Date();
    if (date.getDate() <= 5) {
      //   setError("Please Clear your Dues with everyone");
      //   console.log(date.getDate());
      setError("Please Clear your Dues with everyone");
      toast({
        title: "Please Clear your Dues with everyone",
        description:
          "Data will be deleted automatically after 5th of every month",
      });
    }
  }, []);

  const calculateTotals = (data: ExpenseItem[]): void => {
    const totals = data.reduce(
      (acc: Totals, curr: ExpenseItem) => {
        const price = Number(curr.cinputPrice);
        acc.total += price;

        switch (curr.ainputName.toLowerCase()) {
          case "swaraj":
            acc.swaraj += price;
            break;
          case "manav":
            acc.manav += price;
            break;
          //   case "rupesh":
          //     acc.rupesh += price;
          //     break;
          case "vikas":
            acc.vikas += price;
            break;
        }
        return acc;
      },
      {
        total: 0,
        swaraj: 0,
        manav: 0,
        // rupesh: 0,
        vikas: 0,
        perPerson: 0,
      }
    );

    totals.perPerson = totals.total / NUMBER_OF_MEMBERS;
    setTotals(totals as Totals);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!name || !item || !price) {
      setError("Please fill all fields");
      return;
    }

    const newItem: ExpenseItem = {
      ainputName: name,
      binputItem: item,
      cinputPrice: price,
    };

    try {
      const itemListInDB = ref(database, "itemList");
      await push(itemListInDB, newItem);
      setItem("");
      setPrice("");
      setError("");
    } catch (err) {
      setError(JSON.stringify(err) || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with animated gradient */}
        <div className="text-center space-y-4 relative overflow-hidden rounded-xl p-8 bg-gradient-to-r from-orange-600 to-pink-600">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-pink-600/30 animate-pulse"></div>
          <h1 className="text-4xl font-bold relative z-10">Expense Data</h1>
          <h2 className="text-xl opacity-90 relative z-10">Flat 304</h2>
        </div>

        {error && (
          <Alert variant="destructive" className="animate-shake">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-blue-400">Total Expenses</p>
                <p className="text-2xl font-bold text-blue-400 ">
                  ₹{totals.total}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 hover:border-green-500/40 transition-all">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-green-400">Per Person</p>
                <p className="text-2xl font-bold text-green-400 ">
                  ₹{totals.perPerson.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-purple-400">Recent Expense</p>
                <p className="text-2xl font-bold text-purple-400 ">
                  ₹{items[0]?.cinputPrice || 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 hover:border-orange-500/40 transition-all">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-orange-400 ">Members</p>
                <p className="text-2xl font-bold text-orange-400 ">
                  {NUMBER_OF_MEMBERS}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Form */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all">
          <CardHeader>
            <CardTitle className="text-slate-50 flex items-center space-x-2">
              <CreditCard className="w-6 h-6" />
              <span>Add New Expense</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={setName} value={name}>
              <SelectTrigger className="bg-white/5  text-slate-50 border-white/10 focus:ring-orange-500">
                <SelectValue
                  className="text-slate-50"
                  placeholder="Select Name"
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/50 backdrop-blur-sm text-slate-50">
                <SelectItem value="Manav">Manav</SelectItem>
                {/* <SelectItem value="Rupesh">Rupesh</SelectItem> */}
                <SelectItem value="Swaraj">Swaraj</SelectItem>
                <SelectItem value="Vikas">Vikas</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Item Name"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="text-slate-50 bg-white/5 border-white/10 focus:ring-orange-500"
            />

            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-slate-50 bg-white/5 border-white/10 focus:ring-orange-500"
            />

            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
              onClick={handleSubmit}
            >
              Add Item
            </Button>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="text-slate-50 bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.ainputName.toLowerCase() === "manav"
                          ? "bg-blue-500"
                          : //   : item.ainputName.toLowerCase() === "rupesh"
                          //   ? "bg-green-500"
                          item.ainputName.toLowerCase() === "swaraj"
                          ? "bg-purple-500"
                          : "bg-orange-500"
                      }`}
                    />
                    <span className="font-medium">{item.ainputName}</span>
                  </div>
                  <span className="text-neutral-300 truncate">
                    {item.binputItem}
                  </span>
                  <span className="font-bold">₹{item.cinputPrice}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-lg">
                <span className="font-bold text-blue-400">Total</span>
                <span className="text-xl text-slate-50">₹{totals.total}</span>
              </div>

              {[
                {
                  name: "Swaraj",
                  amount: totals.swaraj,
                  color: "from-purple-500/20 to-purple-600/20",
                  text: "text-purple-400",
                },
                {
                  name: "Manav",
                  amount: totals.manav,
                  color: "from-blue-500/20 to-blue-600/20",
                  text: "text-blue-400",
                },
                // {
                //   name: "Rupesh",
                //   amount: totals.rupesh,
                //   color: "from-green-500/20 to-green-600/20",
                //   text: "text-green-400",
                // },
                {
                  name: "Vikas",
                  amount: totals.vikas,
                  color: "from-orange-500/20 to-orange-600/20",
                  text: "text-orange-400",
                },
              ].map((person, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center bg-gradient-to-r ${person.color} p-4 rounded-lg`}
                >
                  <span className={person.text}>{person.name}</span>
                  <span className="text-slate-50">₹{person.amount}</span>
                </div>
              ))}

              <div className="flex justify-between items-center bg-gradient-to-r from-pink-500/20 to-orange-500/20 p-4 rounded-lg">
                <span className="font-bold text-orange-400">Per Person</span>
                <span className="text-xl text-slate-50">
                  ₹{totals.perPerson.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
