import React, { useState } from 'react';
import { definePlugin } from 'sanity';
import { RocketIcon } from '@sanity/icons';

function DeployPanel() {
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');

  const webhookUrl = (import.meta as any).env?.PUBLIC_VERCEL_DEPLOY_HOOK;

  async function handleDeploy() {
    if (!webhookUrl) {
      setStatus('error');
      return;
    }
    setStatus('deploying');
    try {
      await fetch(webhookUrl, { method: 'POST' });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  const labels = {
    idle: 'Deploy to Production',
    deploying: 'Triggering deploy…',
    success: 'Deploy triggered! (~30s)',
    error: webhookUrl ? 'Error — try again' : 'No deploy hook configured',
  };

  const colors = {
    idle: '#0070f3',
    deploying: '#666',
    success: '#0a8a0a',
    error: '#c00',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 480 }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Deploy Site</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Publishes the latest Sanity content to the live site. Takes ~30 seconds.
      </p>
      <button
        onClick={handleDeploy}
        disabled={status === 'deploying'}
        style={{
          background: colors[status],
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: status === 'deploying' ? 'not-allowed' : 'pointer',
        }}
      >
        {labels[status]}
      </button>
    </div>
  );
}

export const deployTool = definePlugin({
  name: 'deploy-tool',
  tools: [
    {
      name: 'deploy',
      title: 'Deploy',
      icon: RocketIcon,
      component: DeployPanel,
    },
  ],
});
