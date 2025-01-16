import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <div className="flex gap-4">
    <Button>Click me</Button>
    <Button variant='secondary'>Click me</Button>
    <Button variant='ghost'>Click me</Button>
   </div>
  );
}
