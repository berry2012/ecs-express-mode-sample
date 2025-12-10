import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Migrating from AWS App Runner to Amazon ECS Express Mode</h1>
          <p className="subtitle">Modernize your source code based containerized applications with reduced complexity.</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="migration-flow">
            <div className="service-card">
              <div className="service-icon app-runner">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#FF9900"/>
                  <path d="M12 16h24v16H12z" fill="white"/>
                  <path d="M16 20h16v2H16zm0 4h12v2H16zm0 4h8v2H16z" fill="#FF9900"/>
                </svg>
              </div>
              <h3>AWS App Runner</h3>
              <p>Fully managed container service</p>
            </div>

            <div className="arrow">
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path d="M2 12h52m-6-6l6 6-6 6" stroke="#232F3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="service-card">
              <div className="service-icon ecs">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#FF9900"/>
                  <rect x="8" y="12" width="32" height="24" rx="2" fill="white"/>
                  <rect x="12" y="16" width="6" height="4" fill="#FF9900"/>
                  <rect x="20" y="16" width="6" height="4" fill="#FF9900"/>
                  <rect x="28" y="16" width="6" height="4" fill="#FF9900"/>
                  <rect x="12" y="24" width="6" height="4" fill="#FF9900"/>
                  <rect x="20" y="24" width="6" height="4" fill="#FF9900"/>
                  <rect x="28" y="24" width="6" height="4" fill="#FF9900"/>
                </svg>
              </div>
              <h3>Amazon ECS Express Mode</h3>
              <p>Reduce complexity of containers deployment</p>
            </div>
          </div>

          <div className="benefits">
            <h2>Migration Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit">
                <h4>Simplified deployment</h4>
                <p>Deploy containerized applications with production-ready defaults across multiple AWS services and reduced the complexity.</p>
              </div>
              <div className="benefit">
                <h4>Cost optimization</h4>
                <p>Shares Application Load Balancers across multiple Express Mode services using the same networking conifguration to reduce costs.</p>
              </div>
              <div className="benefit">
                <h4>No compromise on capabilities</h4>
                <p>All underlying AWS resources remain accessible for direct management when you need fine-grained control or advanced features.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 AWS Migration Guide. Built for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
