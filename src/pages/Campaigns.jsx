import React, { useEffect, useState } from 'react';
import { getCampaigns, createCampaign, fundCampaign } from '../services/api';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getCampaigns();
        setCampaigns(res.campaigns || res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createCampaign({ title, goal });
      setCampaigns((p) => [res.campaign || res, ...p]);
      setTitle(''); setGoal(0);
    } catch (err) {
      alert(err.message || 'Create failed');
    }
  };

  const handleFund = async (id) => {
    const amount = parseInt(prompt('Amount to fund (in credits)'), 10);
    if (!amount) return;
    try {
      await fundCampaign(id, { amount });
      alert('Fund request sent; credits will be applied after successful checkout/webhook');
    } catch (err) {
      alert(err.message || 'Fund failed');
    }
  };

  if (loading) return <div className="p-6">Loading campaigns...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Campaigns</h2>
      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2 flex-1 rounded" />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal" type="number" className="border p-2 w-36 rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
      </form>

      <div className="grid gap-4">
        {campaigns.length === 0 && <div>No campaigns</div>}
        {campaigns.map((c) => (
          <div key={c.id} className="p-4 border rounded flex justify-between items-center bg-white shadow-sm">
            <div>
              <div className="font-medium text-lg">{c.title}</div>
              <div className="text-sm text-gray-600">Raised: {c.fundedAmount || c.funded || 0}</div>
            </div>
            <div>
              <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={() => handleFund(c.id)}>Fund</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
