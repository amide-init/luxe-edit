import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) => ({
    padding: '8px 16px',
    textDecoration: 'none',
    color: isActive(path) ? '#3b82f6' : '#64748b',
    fontWeight: isActive(path) ? 600 : 400,
    borderBottom: isActive(path) ? '2px solid #3b82f6' : '2px solid transparent',
    transition: 'all 0.2s',
    display: 'inline-block',
  });

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          style={{
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          LuxeEdit
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link to="/" style={linkStyle('/')}>
            Home
          </Link>
          <Link to="/docs" style={linkStyle('/docs')}>
            Docs
          </Link>
          <Link to="/contributors" style={linkStyle('/contributors')}>
            Contributors
          </Link>
          
          {/* External Links */}
          <a
            href="https://www.npmjs.com/package/luxe-edit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              textDecoration: 'none',
              color: '#64748b',
              fontWeight: 400,
            }}
          >
            npm
          </a>
          <a
            href="https://github.com/amide-init/luxe-edit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              textDecoration: 'none',
              color: '#64748b',
              fontWeight: 400,
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

