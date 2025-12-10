import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Sample App Deployment with GitHub Actions in Amazon ECS Express Mode</h1>
          <p className="subtitle">Modernize your source code based containerized applications with reduced complexity with CI/CD capabilities.</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
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
