
import { Cog, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Header Component
export const DashboardHeader = () => (
    <div className="bg-foreground px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center shadow-lg">
                    <Cog className="w-6 h-6 text-background" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-background">Super Admin Dashboard</h1>
                    <p className="text-slate-300">POS system setup and configuration management</p>
                </div>
            </div>
            <Button variant="outline" className=" text-foreground hover:bg-foreground hover:text-background">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
            </Button>
        </div>
    </div>
);