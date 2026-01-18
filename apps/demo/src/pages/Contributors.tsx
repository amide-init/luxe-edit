import React from 'react';

export function Contributors() {
  const contributors = [
    {
      name: 'amide-init',
      role: 'Creator & Maintainer',
      github: 'https://github.com/amide-init',
      avatar: 'https://github.com/amide-init.png',
    },
    // Add more contributors here as the project grows
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px', color: '#1e293b', textAlign: 'center' }}>
          Contributors
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', textAlign: 'center', marginBottom: '48px' }}>
          Thank you to everyone who has contributed to LuxeEdit! 🎉
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          {contributors.map((contributor, idx) => (
            <div 
              key={idx}
              style={{ 
                padding: '24px', 
                background: '#f8fafc', 
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img 
                src={contributor.avatar} 
                alt={contributor.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginBottom: '16px',
                  border: '3px solid #e2e8f0'
                }}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${contributor.name}&background=667eea&color=fff&size=128`;
                }}
              />
              <h3 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1.3rem' }}>
                {contributor.name}
              </h3>
              <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.95rem' }}>
                {contributor.role}
              </p>
              <a
                href={contributor.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
              >
                View Profile
              </a>
            </div>
          ))}
        </div>

        <section style={{ 
          background: '#f8fafc', 
          padding: '32px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#1e293b' }}>
            Want to contribute?
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Contributions are welcome! Check out our GitHub repository to get started.
          </p>
          <a
            href="https://github.com/amide-init/luxe-edit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#1e293b',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 500,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#0f172a'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Contribute on GitHub
          </a>
        </section>
      </div>
    </div>
  );
}

