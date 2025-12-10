import React from 'react';

const Health: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      fontFamily: 'Amazon Ember, Helvetica Neue, Helvetica, Arial, sans-serif'
    }}>
      <h2>Health Check</h2>
      <p style={{ color: '#00C853', fontSize: '18px', marginTop: '10px' }}>
        ✓ Application is healthy
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        display: 'inline-block'
      }}>
        <strong>Status:</strong> OK<br/>
        <strong>Timestamp:</strong> {new Date().toISOString()}
      </div>
    </div>
  );
};

export default Health;
