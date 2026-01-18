"use client";

import { Activity, Plus } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
    onAddClick?: () => void;
}

export default function Navbar({ onAddClick }: NavbarProps) {
    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                <Link href="/">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                        Squares of Satisfaction
                    </h1>
                </Link>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onAddClick}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Habit
                    </button>
                </div>
            </div>
        </nav>
    );
}
