"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flame, Calendar, Trash2, X, Check, Plus } from "lucide-react";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";

interface Activity {
    id: string;
    name: string;
    description: string | null;
    color: string;
    streak: number;
    completedToday: boolean;
    entries: string[];
}

const COLORS = [
    { name: "Emerald", value: "#10b981" },
    { name: "Sky", value: "#0ea5e9" },
    { name: "Violet", value: "#8b5cf6" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Amber", value: "#f59e0b" },
];

const generatePastYearDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
};

const DateGrid = ({
    entries,
    color,
}: {
    entries: string[];
    color: string;
}) => {
    const allDates = generatePastYearDates();
    const weeks: string[][] = [];
    for (let i = 0; i < allDates.length; i += 7) {
        weeks.push(allDates.slice(i, i + 7));
    }

    return (
        <div className="flex gap-0.5 overflow-hidden rounded">
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                    {week.map((date) => {
                        const isCompleted = entries.includes(date);
                        const isToday =
                            date === new Date().toISOString().split("T")[0];
                        return (
                            <div
                                key={date}
                                className={`w-2.5 h-2.5 rounded-sm transition-all duration-200 ${
                                    isCompleted
                                        ? ""
                                        : "bg-slate-200 dark:bg-slate-700"
                                } ${
                                    isToday
                                        ? "ring-1 ring-offset-1 ring-slate-400"
                                        : ""
                                }`}
                                style={isCompleted ? { backgroundColor: color } : undefined}
                                title={date}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

const SAMPLE_ACTIVITIES: Activity[] = [
    {
        id: "1",
        name: "Morning Run",
        description: "Run 5km every morning",
        color: "#10b981",
        streak: 12,
        completedToday: true,
        entries: [
            "2026-01-18",
            "2026-01-17",
            "2026-01-16",
            "2026-01-15",
            "2026-01-14",
            "2026-01-13",
            "2026-01-12",
            "2026-01-11",
            "2026-01-10",
            "2026-01-09",
            "2026-01-08",
            "2026-01-07",
            "2026-01-06",
        ],
    },
    {
        id: "2",
        name: "Read 30 Minutes",
        description: "Read something every day",
        color: "#8b5cf6",
        streak: 5,
        completedToday: true,
        entries: [
            "2026-01-18",
            "2026-01-17",
            "2026-01-16",
            "2026-01-15",
            "2026-01-14",
        ],
    },
    {
        id: "3",
        name: "Meditation",
        description: "10 minutes of mindfulness",
        color: "#0ea5e9",
        streak: 0,
        completedToday: false,
        entries: ["2026-01-10", "2026-01-09", "2026-01-08"],
    },
    {
        id: "4",
        name: "Drink Water",
        description: "8 glasses a day",
        color: "#0ea5e9",
        streak: 21,
        completedToday: true,
        entries: [
            "2026-01-18",
            "2026-01-17",
            "2026-01-16",
            "2026-01-15",
            "2026-01-14",
            "2026-01-13",
            "2026-01-12",
            "2026-01-11",
            "2026-01-10",
            "2026-01-09",
            "2026-01-08",
            "2026-01-07",
            "2026-01-06",
            "2026-01-05",
            "2026-01-04",
            "2026-01-03",
            "2026-01-02",
            "2026-01-01",
            "2025-12-31",
            "2025-12-30",
            "2025-12-29",
        ],
    },
];

const DashboardPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activities, setActivities] = useState<Activity[]>(SAMPLE_ACTIVITIES);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newActivityName, setNewActivityName] = useState("");
    const [newActivityColor, setNewActivityColor] = useState(COLORS[0].value);
    const [isLoading] = useState(false);

    useGSAP(
        () => {
            gsap.fromTo(
                ".activity-card",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            );
        },
        { scope: containerRef },
    );

    const handleAddActivity = (e: React.FormEvent) => {
        e.preventDefault();
        const newActivity: Activity = {
            id: Date.now().toString(),
            name: newActivityName,
            description: null,
            color: newActivityColor,
            streak: 0,
            completedToday: false,
            entries: [],
        };
        setActivities([...activities, newActivity]);
        setShowAddModal(false);
        setNewActivityName("");
    };

    const handleToggleComplete = (activityId: string) => {
        setActivities(
            activities.map((a) => {
                if (a.id === activityId) {
                    const today = new Date().toISOString().split("T")[0];
                    const isCompleted = a.entries.includes(today);
                    if (isCompleted) {
                        return {
                            ...a,
                            completedToday: false,
                            entries: a.entries.filter((e) => e !== today),
                            streak: Math.max(0, a.streak - 1),
                        };
                    } else {
                        return {
                            ...a,
                            completedToday: true,
                            entries: [...a.entries, today],
                            streak: a.streak + 1,
                        };
                    }
                }
                return a;
            }),
        );
    };

    const handleDeleteActivity = (activityId: string) => {
        setActivities(activities.filter((a) => a.id !== activityId));
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar onAddClick={() => setShowAddModal(true)} />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Your Habits
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Track your daily progress and build consistency.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : activities.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Activity className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                            No habits yet
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Start building better habits by adding your first one.
                        </p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Habit
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="activity-card bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                handleToggleComplete(activity.id)
                                            }
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                                activity.completedToday
                                                    ? "bg-green-600 text-white"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-green-100 hover:text-green-600"
                                            }`}
                                        >
                                            <Check
                                                className={`w-6 h-6 ${
                                                    activity.completedToday
                                                        ? ""
                                                        : "opacity-0"
                                                }`}
                                            />
                                        </button>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                {activity.name}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Flame className="w-4 h-4" />
                                                    {activity.streak} day streak
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {activity.entries.length} total
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeleteActivity(activity.id)
                                        }
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="pl-16">
                                    <DateGrid
                                        entries={activity.entries}
                                        color={activity.color}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Add New Habit
                            </h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddActivity} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                                >
                                    Habit Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={newActivityName}
                                    onChange={(e) =>
                                        setNewActivityName(e.target.value)
                                    }
                                    placeholder="e.g., Read for 30 minutes"
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Color
                                </label>
                                <div className="flex gap-2">
                                    {COLORS.map((color) => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() =>
                                                setNewActivityColor(color.value)
                                            }
                                            className={`w-10 h-10 rounded-xl transition-all ${
                                                newActivityColor === color.value
                                                    ? "ring-2 ring-offset-2 ring-slate-400"
                                                    : "hover:scale-105"
                                            }`}
                                            style={{
                                                backgroundColor: color.value,
                                            }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all"
                            >
                                Create Habit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
