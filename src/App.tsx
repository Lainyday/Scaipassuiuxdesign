import { useState } from 'react';
import MobileApp from './components/MobileApp';
import DesktopApp from './components/DesktopApp';
import AdminDashboard from './components/AdminDashboard';
import { Button } from './components/ui/button';

export default function App() {
  const [view, setView] = useState<'mobile' | 'desktop' | 'admin'>('mobile');

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      backgroundColor: '#F2F4F6'
    }}>
      {/* View Switcher */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50,
        display: 'flex',
        gap: '0.5rem',
        backgroundColor: 'white',
        padding: '0.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <Button
          onClick={() => setView('mobile')}
          variant={view === 'mobile' ? 'default' : 'outline'}
          size="sm"
        >
          Mobile
        </Button>
        <Button
          onClick={() => setView('desktop')}
          variant={view === 'desktop' ? 'default' : 'outline'}
          size="sm"
        >
          Desktop
        </Button>
        <Button
          onClick={() => setView('admin')}
          variant={view === 'admin' ? 'default' : 'outline'}
          size="sm"
        >
          Admin
        </Button>
      </div>

      {/* Render appropriate view */}
      {view === 'mobile' && <MobileApp />}
      {view === 'desktop' && <DesktopApp />}
      {view === 'admin' && <AdminDashboard />}
    </div>
  );
}
