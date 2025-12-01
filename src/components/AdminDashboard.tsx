import { Users, Clock, TrendingUp, Award, Check, X } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  email: string;
  department: string;
  currentLevel: string;
  requestedLevel: string;
  timeSaved: number;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminDashboard() {
  const metrics = [
    { label: 'Total Users', value: '1,240', icon: <Users />, color: 'from-[#F47920] to-[#FF9D5C]' },
    { label: 'Time Saved', value: '15,300', suffix: 'hrs', icon: <Clock />, color: 'from-[#4ADE80] to-[#22C55E]' },
    { label: 'Active Today', value: '892', icon: <TrendingUp />, color: 'from-[#3B82F6] to-[#2563EB]' },
    { label: 'L2+ Users', value: '347', icon: <Award />, color: 'from-[#F472B6] to-[#EC4899]' },
  ];

  const applications: Application[] = [
    {
      id: '1',
      name: 'John Kim',
      email: 'john.kim@sk.com',
      department: 'Engineering',
      currentLevel: 'L1',
      requestedLevel: 'L2',
      timeSaved: 120,
      status: 'pending',
    },
    {
      id: '2',
      name: 'Sarah Park',
      email: 'sarah.park@sk.com',
      department: 'Marketing',
      currentLevel: 'L1',
      requestedLevel: 'L2',
      timeSaved: 95,
      status: 'pending',
    },
    {
      id: '3',
      name: 'Mike Lee',
      email: 'mike.lee@sk.com',
      department: 'Product',
      currentLevel: 'L2',
      requestedLevel: 'L3',
      timeSaved: 250,
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F6] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-[#191F28]">Admin Dashboard</h1>
          <p className="text-[#8B95A1]">Manage users and applications</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-[24px] p-6 shadow-sm">
              <div className={`size-14 bg-gradient-to-br ${metric.color} rounded-[20px] flex items-center justify-center text-white mb-4`}>
                {metric.icon}
              </div>
              <div className="space-y-1">
                <p className="text-[#8B95A1]">{metric.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#191F28]">{metric.value}</span>
                  {metric.suffix && <span className="text-[#8B95A1]">{metric.suffix}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm">
          <h2 className="text-[#191F28] mb-6">Level Applications</h2>
          
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-7 gap-4 px-4 py-3 bg-[#F9FAFB] rounded-[12px]">
              <div className="col-span-2 text-[#8B95A1]">Name</div>
              <div className="text-[#8B95A1]">Department</div>
              <div className="text-[#8B95A1]">Current</div>
              <div className="text-[#8B95A1]">Requested</div>
              <div className="text-[#8B95A1]">Time Saved</div>
              <div className="text-[#8B95A1]">Actions</div>
            </div>

            {/* Rows */}
            {applications.map((app) => (
              <div
                key={app.id}
                className="grid grid-cols-7 gap-4 px-4 py-4 hover:bg-[#F9FAFB] rounded-[12px] transition-colors items-center"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <div className="size-10 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white">{app.name[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#191F28] truncate">{app.name}</p>
                    <p className="text-[#8B95A1] truncate">{app.email}</p>
                  </div>
                </div>
                <div className="text-[#191F28]">{app.department}</div>
                <div>
                  <span className="px-3 py-1 bg-[#F2F4F6] text-[#191F28] rounded-full">
                    {app.currentLevel}
                  </span>
                </div>
                <div>
                  <span className="px-3 py-1 bg-[#FFF4E6] text-[#F47920] rounded-full">
                    {app.requestedLevel}
                  </span>
                </div>
                <div className="text-[#191F28]">{app.timeSaved} mins</div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-[#22C55E] hover:bg-[#F0FDF4] rounded-[8px] transition-colors">
                    <Check className="size-4" />
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-[#EF4444] hover:bg-[#FEF2F2] rounded-[8px] transition-colors">
                    <X className="size-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm">
          <h2 className="text-[#191F28] mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <ActivityItem
              user="Emma Chen"
              action="completed a mission"
              time="2 minutes ago"
              type="success"
            />
            <ActivityItem
              user="David Jung"
              action="reached L2 level"
              time="15 minutes ago"
              type="level"
            />
            <ActivityItem
              user="Lisa Wang"
              action="submitted L3 application"
              time="1 hour ago"
              type="application"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  user,
  action,
  time,
  type,
}: {
  user: string;
  action: string;
  time: string;
  type: 'success' | 'level' | 'application';
}) {
  const colors = {
    success: 'from-[#4ADE80] to-[#22C55E]',
    level: 'from-[#F47920] to-[#FF9D5C]',
    application: 'from-[#3B82F6] to-[#2563EB]',
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-[#F9FAFB] rounded-[12px] transition-colors">
      <div className={`size-10 bg-gradient-to-br ${colors[type]} rounded-full flex items-center justify-center flex-shrink-0`}>
        <span className="text-white">{user[0]}</span>
      </div>
      <div className="flex-1">
        <p className="text-[#191F28]">
          <span>{user}</span> {action}
        </p>
        <p className="text-[#8B95A1]">{time}</p>
      </div>
    </div>
  );
}
