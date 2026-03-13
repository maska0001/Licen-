import React, { useState, useEffect } from "react";
import { useAppContext } from "../../App";
import { Check, Pencil, Trash2, X, Plus } from "lucide-react";
import { TASK_CATEGORIES, migrateCategoryToEmoji } from "../../data/categories";
import {
  checklistService,
  ChecklistItem,
} from "../../services/checklistService";

export function Checklist() {
  const { activeEventId } = useAppContext();
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sortBy, setSortBy] = useState<"category" | "date">("category");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    category: "📋 General",
    dueDate: "",
  });

  // Load checklist from backend
  useEffect(() => {
    const loadChecklist = async () => {
      if (!activeEventId) {
        setChecklist([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const checklistData = await checklistService.getChecklistItems(
          parseInt(activeEventId)
        );
        setChecklist(checklistData || []);
      } catch (error) {
        console.error("Failed to load checklist:", error);
        setChecklist([]);
      } finally {
        setLoading(false);
      }
    };

    loadChecklist();
  }, [activeEventId]);

  const toggleTask = async (id: number) => {
    const task = checklist.find((item) => item.id === id);
    if (!task) return;

    try {
      await checklistService.updateChecklistItem(id, {
        completed: !task.completed,
      });

      setChecklist(
        checklist.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error) {
      console.error("Failed to toggle task:", error);
      alert("Eroare la actualizarea sarcinii");
    }
  };

  const addTask = async () => {
    if (
      !activeEventId ||
      !formData.task.trim() ||
      !formData.category ||
      !formData.dueDate
    ) {
      alert("Te rog completează toate câmpurile!");
      return;
    }

    try {
      const createdTask = await checklistService.createChecklistItem(
        parseInt(activeEventId),
        {
          task: formData.task,
          category: formData.category,
          due_date: formData.dueDate,
          completed: false,
        }
      );

      setChecklist([...checklist, createdTask]);
      setFormData({ task: "", category: "📋 General", dueDate: "" });
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Eroare la adăugarea sarcinii");
    }
  };

  const updateTask = async () => {
    if (
      !formData.task.trim() ||
      !formData.category.trim() ||
      !formData.dueDate ||
      !editingTask
    )
      return;

    try {
      await checklistService.updateChecklistItem(editingTask, {
        task: formData.task,
        category: formData.category,
        due_date: formData.dueDate,
      });

      setChecklist(
        checklist.map((item) =>
          item.id === editingTask
            ? {
                ...item,
                task: formData.task,
                category: formData.category,
                due_date: formData.dueDate,
              }
            : item
        )
      );

      setFormData({ task: "", category: "📋 General", dueDate: "" });
      setEditingTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Eroare la actualizarea sarcinii");
    }
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Ești sigur că vrei să ștergi această sarcină?")) return;

    try {
      await checklistService.deleteChecklistItem(id);
      setChecklist(checklist.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Eroare la ștergerea sarcinii");
    }
  };

  const openEditModal = (id: number) => {
    const task = checklist.find((item) => item.id === id);
    if (task) {
      setFormData({
        task: task.task,
        category: task.category,
        dueDate: task.due_date || "",
      });
      setEditingTask(id);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingTask(null);
    setFormData({ task: "", category: "📋 General", dueDate: "" });
  };

  // Stats
  const totalTasks = checklist.length;
  const pendingTasks = checklist.filter((t) => !t.completed).length;
  const completedTasks = checklist.filter((t) => t.completed).length;

  // Filter tasks
  const filteredTasks = checklist.filter((item) => {
    if (filter === "all") return true;
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    } else if (sortBy === "date") {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    return 0;
  });

  // Migrate old categories to emoji versions automatically
  const tasksWithEmojis = sortedTasks.map((task) => ({
    ...task,
    category: migrateCategoryToEmoji(task.category),
  }));

  // Group by category
  const categories = Array.from(
    new Set(tasksWithEmojis.map((item) => item.category))
  );

  // Group by deadline periods
  const getDeadlineGroup = (dateStr: string | undefined) => {
    if (!dateStr) return "Fără deadline";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) return "Expirate";
    if (daysRemaining <= 7) return "În această săptămână";
    if (daysRemaining <= 30) return "În această lună";
    if (daysRemaining <= 90) return "În următoarele 3 luni";
    if (daysRemaining <= 180) return "În următoarele 6 luni";
    return "Peste 6 luni";
  };

  const deadlineGroups = [
    "Expirate",
    "În această săptămână",
    "În această lună",
    "În următoarele 3 luni",
    "În următoarele 6 luni",
    "Peste 6 luni",
    "Fără deadline",
  ];

  // Progress percentage
  const progressPercent =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Format deadline text
  const formatDeadline = (dateStr: string | undefined) => {
    if (!dateStr) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const months = [
      "Ian",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Iun",
      "Iul",
      "Aug",
      "Sep",
      "Oct",
      "Noi",
      "Dec",
    ];
    const day = dueDate.getDate();
    const month = months[dueDate.getMonth()];
    const dateText = `${day} ${month}`;

    let timeText = "";
    let colorClass = "";

    if (daysRemaining < 0) {
      const daysLate = Math.abs(daysRemaining);
      timeText =
        daysLate === 1 ? "1 zi întârziere" : `${daysLate} zile întârziere`;
      colorClass = "bg-red-50 text-red-700";
    } else if (daysRemaining === 0) {
      timeText = "Astăzi";
      colorClass = "bg-amber-50 text-amber-700";
    } else if (daysRemaining === 1) {
      timeText = "Mâine";
      colorClass = "bg-amber-50 text-amber-700";
    } else if (daysRemaining < 7) {
      timeText = `${daysRemaining} zile`;
      colorClass = "bg-amber-50 text-amber-700";
    } else if (daysRemaining < 14) {
      timeText = "1 săptămână";
      colorClass = "bg-green-50 text-green-700";
    } else if (daysRemaining < 30) {
      timeText = `${Math.floor(daysRemaining / 7)} săptămâni`;
      colorClass = "bg-green-50 text-green-700";
    } else if (daysRemaining < 60) {
      timeText = "1 lună";
      colorClass = "bg-green-50 text-green-700";
    } else if (daysRemaining < 90) {
      timeText = "2 luni";
      colorClass = "bg-green-50 text-green-700";
    } else {
      timeText = "3 luni";
      colorClass = "bg-green-50 text-green-700";
    }

    return { text: `${timeText} (${dateText})`, colorClass };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-[50px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[80px] leading-none font-medium text-[#960010] uppercase tracking-[-4.8px] mb-2">
          Checklist eveniment
        </h2>
        <p className="text-[16px] text-[#4a5565] tracking-[-0.3125px]">
          Urmărește progresul sarcinilor pentru evenimentul tău.
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-[#960010] p-10 mb-6">
        <div className="bg-white p-5">
          <h3 className="text-[43px] leading-none font-medium text-[#960010] uppercase tracking-[-2.58px] mb-[32px]">
            Progres total
          </h3>

          {/* Progress Bar */}
          <div className="bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] h-3 mb-4 overflow-hidden">
            <div
              className="bg-black h-full rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 h-10 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#960010] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  : "bg-white border border-[#e7e7e7] text-[#364153] hover:border-[#960010] hover:bg-[#fef2f2]"
              }`}
            >
              <span className="text-[16px] tracking-[-0.3125px]">Toate</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  filter === "all"
                    ? "bg-white/20 text-white"
                    : "bg-[#f3f4f6] text-[#4a5565]"
                }`}
              >
                {totalTasks}
              </span>
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-4 h-11 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                filter === "pending"
                  ? "bg-[#960010] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  : "bg-white border border-[#e7e7e7] text-[#364153] hover:border-[#960010] hover:bg-[#fef2f2]"
              }`}
            >
              <span className="text-[16px] tracking-[-0.3125px]">De făcut</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  filter === "pending"
                    ? "bg-white/20 text-white"
                    : "bg-[#f3f4f6] text-[#4a5565]"
                }`}
              >
                {pendingTasks}
              </span>
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-4 h-11 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                filter === "completed"
                  ? "bg-[#960010] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  : "bg-white border border-[#e7e7e7] text-[#364153] hover:border-[#960010] hover:bg-[#fef2f2]"
              }`}
            >
              <span className="text-[16px] tracking-[-0.3125px]">
                Finalizate
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  filter === "completed"
                    ? "bg-white/20 text-white"
                    : "bg-[#f3f4f6] text-[#4a5565]"
                }`}
              >
                {completedTasks}
              </span>
            </button>

            <div className="h-11 w-px bg-[#e9d4ff] mx-2" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#4a5565] tracking-[-0.1504px]">
                Sortare:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white border border-[#e7e7e7] h-10 px-4 rounded-full text-[#364153] cursor-pointer focus:outline-none"
              >
                <option value="category">Categorie</option>
                <option value="date">Deadline</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Task Categories */}
      {sortBy === "category" ? (
        /* ONE BIG BORDER around ALL categories */
        <div className="border-2 border-[#e5e7eb] p-8">
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryTasks = tasksWithEmojis.filter(
                (t) => t.category === category
              );
              const completedCount = categoryTasks.filter(
                (t) => t.completed
              ).length;

              return (
                <div key={category} className="bg-white">
                  {/* Category Header */}
                  <div className="flex items-center justify-between h-[28px] mb-[16px]">
                    <h3 className="text-[22px] font-medium text-[#101828] uppercase tracking-[-0.55px]">
                      {category}
                    </h3>
                    <span className="text-sm text-[#6a7282] tracking-[-0.1504px]">
                      {completedCount}/{categoryTasks.length}
                    </span>
                  </div>

                  {/* Tasks - Each with its own border */}
                  <div className="space-y-2">
                    {categoryTasks.map((task) => {
                      const deadline = task.due_date
                        ? formatDeadline(task.due_date)
                        : null;

                      return (
                        <div
                          key={task.id}
                          className="bg-white border-2 border-[#e5e7eb] flex items-center gap-4 px-7 py-5 group h-[68px]"
                        >
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              task.completed
                                ? "bg-[#960010] border-[#960010]"
                                : "border-[#d1d5dc] hover:border-[#960010]"
                            }`}
                          >
                            {task.completed && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </button>

                          {/* Task Text */}
                          <p
                            className={`flex-1 text-[16px] tracking-[-0.3125px] ${
                              task.completed
                                ? "text-gray-400 line-through"
                                : "text-[#101828]"
                            }`}
                          >
                            {task.task}
                          </p>

                          {/* Deadline Badge */}
                          {deadline && !task.completed && (
                            <span
                              className={`text-[10px] px-3 py-1 rounded-full uppercase font-semibold ${deadline.colorClass}`}
                            >
                              {deadline.text}
                            </span>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 transition-opacity">
                            <button
                              onClick={() => openEditModal(task.id)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-[16px] transition-all"
                            >
                              <Pencil className="w-4 h-4 text-[#99A1AF]" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-[16px] transition-all"
                            >
                              <Trash2 className="w-4 h-4 text-[#99A1AF]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Sorted by date - GROUPED BY DEADLINE PERIODS with TITLES
        <div className="border-2 border-[#e5e7eb] p-8">
          <div className="space-y-8">
            {deadlineGroups.map((group) => {
              const groupTasks = tasksWithEmojis.filter(
                (t) => getDeadlineGroup(t.due_date) === group
              );
              const completedCount = groupTasks.filter(
                (t) => t.completed
              ).length;

              if (groupTasks.length === 0) return null;

              return (
                <div key={group} className="bg-white">
                  {/* Deadline Group Header */}
                  <div className="flex items-center justify-between h-[28px] mb-[16px]">
                    <h3 className="text-[22px] font-medium text-[#101828] uppercase tracking-[-0.55px]">
                      {group}
                    </h3>
                    <span className="text-sm text-[#6a7282] tracking-[-0.1504px]">
                      {completedCount}/{groupTasks.length}
                    </span>
                  </div>

                  {/* Tasks - Each with its own border */}
                  <div className="space-y-2">
                    {groupTasks.map((task) => {
                      const deadline = task.due_date
                        ? formatDeadline(task.due_date)
                        : null;

                      return (
                        <div
                          key={task.id}
                          className="bg-white border-2 border-[#e5e7eb] flex items-center gap-4 px-[30px] py-[18px]"
                        >
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              task.completed
                                ? "bg-[#960010] border-[#960010]"
                                : "border-[#d1d5dc] hover:border-[#960010]"
                            }`}
                          >
                            {task.completed && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </button>

                          {/* Category Badge + Task Text (Vertical Stack) */}
                          <div className="flex flex-col gap-2 flex-1">
                            {/* Category Badge */}
                            <span className="text-[10px] px-3 py-1 rounded-full bg-[#f3f4f6] text-[#4a5565] w-fit uppercase font-semibold">
                              {task.category}
                            </span>

                            {/* Task Text */}
                            <p
                              className={`text-[16px] leading-[24px] tracking-[-0.625px] ${
                                task.completed
                                  ? "text-gray-400 line-through"
                                  : "text-[#101828]"
                              }`}
                            >
                              {task.task}
                            </p>
                          </div>

                          {/* Deadline Badge */}
                          {deadline && !task.completed && (
                            <span
                              className={`text-[10px] px-3 py-1 rounded-full uppercase font-semibold ${deadline.colorClass}`}
                            >
                              {deadline.text}
                            </span>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(task.id)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-[16px] transition-all"
                            >
                              <Pencil className="w-4 h-4 text-[#99A1AF]" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-[16px] transition-all"
                            >
                              <Trash2 className="w-4 h-4 text-[#99A1AF]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {checklist.length === 0 && (
        <div className="bg-white p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-900 mb-2">Nu există sarcini încă</p>
          <p className="text-sm text-gray-400 mb-6">
            Completează wizard-ul pentru a genera checklist-ul
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[#960010] hover:bg-[#7a000d] text-white rounded-full transition-all"
          >
            Adaugă prima sarcină
          </button>
        </div>
      )}

      {/* Floating Add Button */}
      {checklist.length > 0 && (
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#960010] hover:bg-[#7a000d] text-white rounded-full shadow-lg flex items-center justify-center transition-all z-40"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingTask) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-gray-900">
                {editingTask ? "Editează sarcina" : "Adaugă sarcină nouă"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Categorie
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                  >
                    {TASK_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-full shadow-lg z-10">
                      {TASK_CATEGORIES.map((cat) => (
                        <div
                          key={cat}
                          className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setFormData({ ...formData, category: cat });
                            setShowCategoryDropdown(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Sarcină
                </label>
                <input
                  type="text"
                  value={formData.task}
                  onChange={(e) =>
                    setFormData({ ...formData, task: e.target.value })
                  }
                  placeholder="Descriere sarcină"
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:border-[#960010] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={editingTask ? updateTask : addTask}
                disabled={
                  !formData.task || !formData.category || !formData.dueDate
                }
                className="flex-1 bg-[#960010] hover:bg-[#7a000d] text-white py-3 rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {editingTask ? "Salvează" : "Adaugă"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-full transition-all"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
